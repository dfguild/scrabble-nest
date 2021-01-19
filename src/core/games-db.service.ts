import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { GameDTO, GameListDTO, GameListItem } from '../game/Game-dto';
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
      gameList.push(itemObj);
    }
    this.logger.debug(`:getGamesList returning ${JSON.stringify(gameList)}`);

    return gameList;
  }

  private getDate(): string {
    return new Date().toISOString();
  }
}
