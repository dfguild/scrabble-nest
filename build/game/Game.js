"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const Grid_1 = require("./Grid");
const TileBag_1 = require("./TileBag");
const Player_1 = require("./Player");
const Game_dto_1 = require("./Game-dto");
class Game {
    constructor(gameCreateInDto) {
        this._logger = new common_1.Logger(Game.name);
        this._logger.debug('in game constructor');
        this._gameId = this._getGameId();
        this._gameName = gameCreateInDto.gameName;
        this._logger.debug('About to create new Grid');
        this._grid = new Grid_1.default();
        this._logger.debug('About to create new TileBag');
        this._tileBag = new TileBag_1.default();
        this._players = [];
        this._logger.debug('About to create new Player');
        this._players.push(new Player_1.default(gameCreateInDto.playerName, this._tileBag));
        this._turn = 0;
    }
    joinGame(gameCreateInDto) {
        this._logger.debug('in join game');
        this._logger.debug(`playername: ${gameCreateInDto.playerName}`);
        this._logger.debug(`gameName: ${gameCreateInDto.gameName}`);
        this._players.push(new Player_1.default(gameCreateInDto.playerName, this._tileBag));
    }
    get gameName() {
        return this._gameName;
    }
    get gameId() {
        return this._gameId;
    }
    get gameTurn() {
        return this._turn;
    }
    get gamePlayers() {
        return this._players;
    }
    incrementTurn(turn) {
        this._turn = turn % this._players.length;
    }
    getGameDto() {
        this._logger.debug('In CompleteGameDTO');
        const dto = new Game_dto_1.GameDTO();
        //Assign values in the expected format to the DTO object
        dto.gameID = this._gameId;
        dto.gameName = this.gameName;
        dto.grid = this._grid.toArray();
        const playerDTOs = [];
        for (const player of this._players) {
            playerDTOs.push(player.toPlayerDTO());
        }
        dto.players = playerDTOs;
        dto.remainingTiles = this._tileBag.toArray();
        dto.turn = this._turn;
        return dto;
    }
    _getGameId() {
        return Game._gameIdCounter++;
    }
    updateGame(g) {
        this._grid.fromArray(g.grid);
        this._tileBag.setTileBag(g.remainingTiles);
        g.players.map((p) => this._players[p.order].updatePlayers(p));
        this._turn = g.turn;
    }
}
exports.default = Game;
Game._gameIdCounter = 0;
//# sourceMappingURL=Game.js.map