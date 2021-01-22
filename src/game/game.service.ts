import { Injectable, Logger } from '@nestjs/common';

import * as Constants from '../Constants';
import { TileBagService } from './tile-bag-service';
import { GameCreateInDto, GameDTO, GameState, PlayerDTO } from './Game-dto';
import { GamesDbService } from '../core/games-db.service';

@Injectable()
export class GameService {
  private readonly _logger: Logger;
  constructor(private readonly gamesDb: GamesDbService, private readonly tileBag: TileBagService) {
    this._logger = new Logger(GameService.name);
  }

  async createGame(gameCreateInDto: GameCreateInDto): Promise<void> {
    const g = new GameDTO();
    g.turn = 0;
    g.grid = Constants.BLANK_GRID;
    g.gameName = gameCreateInDto.gameName;
    g.gameState = GameState.NotStarted;
    g.totalMoves = 0;
    g.passCounter = 0;

    this.tileBag.setTileBag(Constants.tiles);

    const p = new PlayerDTO();
    p.player_name = gameCreateInDto.playerName;
    p.order = 0;
    p.score = 0;
    p.tiles = this.tileBag.getTiles([...Constants.BLANK_TILERACK]);

    g.players = [p];
    g.remainingTiles = this.tileBag.tileBag;
    this._logger.debug(`:createGame returning remainingTile with length of:${g.remainingTiles.length}`);

    await this.gamesDb.addGame(g);
    this._logger.debug('Created Game: Verbose to display');
    this._logger.verbose(`:createGame new game=${JSON.stringify(g)}`);
  }

  joinGame(gmCreateDTO: GameCreateInDto): boolean {
    const g = this.gamesDb.getGame(gmCreateDTO.id);
    this._logger.debug(`joining game with: ${JSON.stringify(gmCreateDTO)}`);

    const p = new PlayerDTO();
    p.player_name = gmCreateDTO.playerName;
    p.order = g.players.length;
    p.score = 0;
    this.tileBag.setTileBag(g.remainingTiles);
    p.tiles = this.tileBag.getTiles(Constants.BLANK_TILERACK);
    g.players.push(p);
    g.remainingTiles = this.tileBag.tileBag;

    //Check to see if game has started and if just starting a round --> give turn to new player
    if (g.totalMoves > 0 && g.turn === 0) {
      g.turn = p.order;
    }

    this._logger.verbose(`game as modified DTO:${JSON.stringify(g)}`);
    this._logger.debug('calling addPlayertoGame');
    this.gamesDb.updateGame(g);
    return true;
  }

  updateGame(newGameDto: GameDTO): GameDTO {
    const g = this.gamesDb.getGame(newGameDto.id);
    this._logger.debug(`:updateGame updating turn from: ${g.turn}`);
    g.turn = ++g.turn % g.players.length;
    this._logger.debug(`:updateGame updating turn to: ${g.turn}`);
    g.totalMoves += 1;
    g.gameState = newGameDto.gameState;
    g.grid = newGameDto.grid;
    g.remainingTiles = newGameDto.remainingTiles;
    g.players[newGameDto.players[0].order] = newGameDto.players[0];
    g.passCounter = newGameDto.passCounter;
    this._logger.verbose(`:updateGame - update game:${JSON.stringify(g)}`);
    this.gamesDb.updateGame(g);
    return g;
  }
}
