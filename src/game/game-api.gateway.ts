import { WebSocketGateway, ConnectedSocket, MessageBody, SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';

import { GameService } from './game.service';
import { GameDTO, GameCreateInDto } from './Game-dto';
import { GamesDbService } from '../core/games-db.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@WebSocketGateway({ origin: process.env.CORS_ORIGIN })
export class GameApiGateway {
  private readonly logger = new Logger(GameApiGateway.name);
  @WebSocketServer() server;

  constructor(private readonly gamesDb: GamesDbService, private readonly gmService: GameService) {}

  //GAME related INBOUND API requests

  @SubscribeMessage('startGame')
  async onGameStart(@ConnectedSocket() client: Socket, @MessageBody() g: { player: string; id: string }) {
    const gameDto: GameDTO = this.gamesDb.getGame(g.id);

    client.join(g.id); //join room of game name
    this.logger.debug(`:get gameDTO: ${JSON.stringify(gameDto)}`);
    this.sendGameDto(gameDto, client);
  }

  @SubscribeMessage('updateGame')
  async onGameMove(@MessageBody() g: GameDTO) {
    this.sendGameDto(this.gmService.updateGame(g));
  }

  @SubscribeMessage('joinRoom')
  async onRoomJoin(@ConnectedSocket() client: Socket, @MessageBody() g: { id: string; totalMoves: number }) {
    client.join(g.id);
    if (g.totalMoves <= this.gamesDb.getGame(g.id).totalMoves) {
      this.sendGameDto(this.gamesDb.getGame(g.id), client);
    }
  }

  //GAME related OUTBOUND API responses

  async onGameJoin(gInDto: GameCreateInDto) {
    this.logger.debug(`:onGameJoin - getting DTO`);
    this.server.to(gInDto.id).emit('gameJoinUpdate', this.gamesDb.getGame(gInDto.id));
  }

  //send game updates to correct room
  sendGameDto(g: GameDTO, socket?: Socket) {
    //Add protocol to resend if response isn't received
    this.logger.debug(`:onGameJoin - getting DTO with ${JSON.stringify(g)}`);
    if (socket) {
      socket.emit('gameDto', g);
    } else {
      this.server.to(g.id).emit('gameDto', g);
    }
    this.sendGamesList(); //turns are likely changed -- send gameList update
  }

  //GameList APIs

  @SubscribeMessage('createGame')
  createGame(@MessageBody() gameCreateInDto: GameCreateInDto): void {
    this.logger.debug(`:createGame calling gameCreate DTO in: ${JSON.stringify(gameCreateInDto)}`);
    this.gmService.createGame(gameCreateInDto).then(() => this.sendGamesList());
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
