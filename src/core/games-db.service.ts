import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { GameDTO, GameListDTO, GameListItem, GameState } from '../game/Game-dto';
import * as Constants from '../Constants';
import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import { CosmosClient, Container } from '@azure/cosmos';

@Injectable()
export class GamesDbService implements OnModuleInit {
  private readonly idToGameDto: Map<string, GameDTO> = new Map();
  private readonly logger: Logger = new Logger(GamesDbService.name);
  private db: Container;

  onModuleInit(): void {
    this.initDB();
    setInterval(this.pruneDB, Constants.PRUNE_DB_HOURS * 60 * 60 * 1000);
  }

  async initDB(): Promise<void> {
    const secretClient = new SecretClient(Constants.VAULT_URL, new DefaultAzureCredential());

    const secret = await secretClient.getSecret(Constants.DB_SECRET_NAME);

    const dbClient = new CosmosClient({ endpoint: Constants.DB_URL, key: secret.value });
    this.db = dbClient.database(Constants.DB_NAME).container(Constants.CONTAINER_NAME);

    const { resources } = await this.db.items.query<GameDTO>('Select * from c').fetchAll();

    for (const g of resources) {
      this.logger.debug(`:InitDB Item=${JSON.stringify(g)}`);
      this.idToGameDto.set(g.id, g);
    }
    this.pruneDB(); // run a prune on startup
  }

  async pruneDB(): Promise<void> {
    const now = +new Date();
    this.logger.log(`:PruneDB running`);
    for (const value of this.idToGameDto.values()) {
      const lastUpdate = +new Date(value.gameDate);
      const ageHours: number = Math.floor((now - lastUpdate) / (60 * 60 * 1000));
      if (
        (value.gameState === GameState.GameOver && ageHours >= Constants.COMPLETE_GAME_PRUNE_HOURS) ||
        ageHours >= Constants.INACTIVE_GAME_PRUNE_HOURS
      ) {
        this.logger.log(`:PruneDB deleting item ${value.id} dated: ${value.gameDate} with state ${value.gameState}`);
        await this.db.item(value.id).delete();
        this.idToGameDto.delete(value.id);
      }
    }
  }

  getGame(id: string): GameDTO {
    return this.idToGameDto.get(id);
  }

  async addGame(newGm: GameDTO): Promise<void> {
    newGm.gameDate = this.getDate();
    const { resource } = await this.db.items.create(newGm);
    newGm.id = resource.id;
    this.idToGameDto.set(newGm.id, newGm);
  }

  updateGame(newGm: GameDTO): void {
    newGm.gameDate = this.getDate();
    this.idToGameDto.set(newGm.id, newGm);
    this.db.items.upsert(newGm);
  }

  getGamesList(): GameListDTO {
    const gameList: GameListDTO = [];
    for (const [gameId, game] of this.idToGameDto) {
      const itemObj = new GameListItem();
      itemObj.id = gameId;
      itemObj.gameName = game.gameName;
      itemObj.gamePlayers = game.players.map((p) => p.player_name);
      itemObj.gameTurn = game.turn;
      itemObj.gameState = game.gameState;
      itemObj.totalMoves = game.totalMoves;
      gameList.push(itemObj);
    }
    this.logger.debug(`:getGamesList returning ${JSON.stringify(gameList)}`);

    return gameList;
  }

  private getDate(): string {
    return new Date().toISOString();
  }
}
