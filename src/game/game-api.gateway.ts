import { WebSocketGateway, ConnectedSocket, MessageBody, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';

import { GameService } from './game.service';
import { GameDTO, GameCreateInDto } from './Game-dto';
import { GamesDbService } from '../core/games-db.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@WebSocketGateway({ origin: 'localhost:4000' })
export class GameApiGateway {
  private readonly logger = new Logger(GameApiGateway.name);
  @WebSocketServer() server;

  constructor(private readonly gamesDb: GamesDbService, private readonly gmService: GameService) {}

  //GAME related INBOUND API requests

  @SubscribeMessage('startGame')
  async onGameStart(@ConnectedSocket() client: Socket, @MessageBody() g: { player: string; gameId: number }) {
    const gameDto: GameDTO = this.gamesDb.getGame(g.gameId);
    client.join(g.gameId.toString()); //join room of game name
    this.logger.debug(`:get gameDTO: ${JSON.stringify(gameDto)}`);
    this.sendGameDto(gameDto, client);
  }

  @SubscribeMessage('updateGame')
  async onGameMove(@ConnectedSocket() client: Socket, @MessageBody() g: GameDTO) {
    this.sendGameDto(this.gmService.updateGame(g));
  }

  //GAME related OUTBOUND API responses

  async onGameJoin(gInDto: GameCreateInDto) {
    this.logger.debug(`:onGameJoin - getting DTO`);
    this.server.to(gInDto.gameId.toString()).emit('gameJoinUpdate', this.gamesDb.getGame(gInDto.gameId));
  }

  //send game updates to correct room
  sendGameDto(g: GameDTO, socket?: Socket) {
    this.logger.debug(`:onGameJoin - getting DTO with ${JSON.stringify(g)}`);
    if (socket) {
      socket.emit('gameDto', g);
    } else {
      this.server.to(g.gameId.toString()).emit('gameDto', g);
    }
  }

  //GameList APIs

  @SubscribeMessage('createGame')
  createGame(@MessageBody() gameCreateInDto: GameCreateInDto): void {
    this.logger.debug(`:createGame calling gameCreate DTO in: ${JSON.stringify(gameCreateInDto)}`);
    this.gmService.createGame(gameCreateInDto);
    this.sendGamesList();
  }

  @SubscribeMessage('joinGame')
  joinGame(@MessageBody() gameCreateInDto: GameCreateInDto): void {
    this.logger.debug(`:joinGames with gmCreateInDTO=${JSON.stringify(gameCreateInDto)}`);
    this.gmService.joinGame(gameCreateInDto);
    this.onGameJoin(gameCreateInDto);
    this.sendGamesList();
  }

  @SubscribeMessage('getGames')
  getGames(@ConnectedSocket() client: Socket): void {
    client.join('gameListUpdates');
    this.sendGamesList();
  }

  private sendGamesList(): void {
    const g = this.gamesDb.getGamesList();
    this.logger.debug(`:getGames sending to gamelIstUpdates event ${JSON.stringify(g)}`);
    this.server.to('gameListUpdates').emit('gameListUpdates', g);
  }
}
