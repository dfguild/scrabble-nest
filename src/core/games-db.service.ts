import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { GameDTO, GameListDTO, GameListItem } from '../game/Game-dto';
import * as Constants from '../Constants';

const ddb = new AWS.DynamoDB.DocumentClient(Constants.AWS_DYNAMODB_CONFIG);
const TABLE_NAME = Constants.GAMES_TABLE;

@Injectable()
export class GamesDbService implements OnModuleInit {
  private readonly gameIdToGameDto: Map<number, GameDTO> = new Map();
  private readonly logger: Logger = new Logger(GamesDbService.name);
  maxId = 0;

  onModuleInit(): void {
    const params = {
      TableName: TABLE_NAME,
    };

    ddb.scan(params, (err, data) => {
      if (err) {
        this.logger.debug(`Unable to scan the table. Error JSON:${JSON.stringify(err, null, 2)}`);
      } else {
        console.log('Scan succeeded.');
        data.Items.forEach((item) => {
          const g = item as GameDTO;
          this.maxId = Math.max(this.maxId, g.gameId);
          this.logger.debug(`Item :${JSON.stringify(g)}`);
          this.gameIdToGameDto.set(g.gameId, g);
        });
      }
    });
  }

  getGame(id: number): GameDTO {
    return this.gameIdToGameDto.get(id);
  }

  addGame(newGm: GameDTO): void {
    newGm.gameDate = this.getDate();
    this.gameIdToGameDto.set(newGm.gameId, newGm);
    const params = {
      TableName: TABLE_NAME,
      Item: newGm,
    };

    this.logger.debug(`:addGame calling put with params=${JSON.stringify(params)}`);

    ddb.put(params, (err, data) => {
      this.logger.debug(`:addGame - Entered callback`);
      if (err) {
        this.logger.debug(`Unable to pub game. Error JSON:${JSON.stringify(err, null, 2)}`);
      } else {
        this.logger.debug(`Put succeeded with data=${JSON.stringify(data)}`);
      }
    });
  }

  updateGame(newGm: GameDTO): void {
    newGm.gameDate = this.getDate();
    this.gameIdToGameDto.set(newGm.gameId, newGm);

    const params = {
      TableName: TABLE_NAME,
      Item: newGm,
    };

    ddb.put(params, (err, data) => {
      this.logger.debug(`:updateGame - Entered callback`);
      if (err) {
        this.logger.debug(`Unable to pub game. Error JSON:${JSON.stringify(err, null, 2)}`);
      } else {
        this.logger.debug(`Put succeeded with data=${JSON.stringify(data)}`);
      }
    });
  }

  getGamesList(): GameListDTO {
    const gameList: GameListDTO = [];
    for (const [gameId, game] of this.gameIdToGameDto) {
      const itemObj = new GameListItem();
      itemObj.gameId = gameId;
      itemObj.gameName = game.gameName;
      itemObj.gamePlayers = game.players.map((p) => p.player_name);
      itemObj.gameTurn = game.turn;
      itemObj.gameState = game.gameState;
      gameList.push(itemObj);
    }
    this.logger.debug(`:getGamesList returning ${JSON.stringify(gameList)}`);

    return gameList.sort((a, b) => a.gameId - b.gameId);
  }

  private getDate(): string {
    return new Date().toISOString();
  }
}
