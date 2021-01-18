"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var Grid_1 = require("./Grid");
var TileBag_1 = require("./TileBag");
var Player_1 = require("./Player");
var Game_dto_1 = require("./Game-dto");
var Game = /** @class */ (function () {
    function Game(gameCreateInDto) {
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
    Game.prototype.joinGame = function (gameCreateInDto) {
        this._logger.debug('in join game');
        this._logger.debug("playername: " + gameCreateInDto.playerName);
        this._logger.debug("gameName: " + gameCreateInDto.gameName);
        this._players.push(new Player_1.default(gameCreateInDto.playerName, this._tileBag));
    };
    Object.defineProperty(Game.prototype, "gameName", {
        get: function () {
            return this._gameName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "gameId", {
        get: function () {
            return this._gameId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "gameTurn", {
        get: function () {
            return this._turn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "gamePlayers", {
        get: function () {
            return this._players;
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.incrementTurn = function (turn) {
        this._turn = turn % this._players.length;
    };
    Game.prototype.getGameDto = function () {
        this._logger.debug('In CompleteGameDTO');
        var dto = new Game_dto_1.GameDTO();
        //Assign values in the expected format to the DTO object
        dto.gameID = this._gameId;
        dto.gameName = this.gameName;
        dto.grid = this._grid.toArray();
        var playerDTOs = [];
        for (var _i = 0, _a = this._players; _i < _a.length; _i++) {
            var player = _a[_i];
            playerDTOs.push(player.toPlayerDTO());
        }
        dto.players = playerDTOs;
        dto.remainingTiles = this._tileBag.toArray();
        dto.turn = this._turn;
        return dto;
    };
    Game.prototype._getGameId = function () {
        return Game._gameIdCounter++;
    };
    Game.prototype.updateGame = function (g) {
        var _this = this;
        this._grid.fromArray(g.grid);
        this._tileBag.setTileBag(g.remainingTiles);
        g.players.map(function (p) { return _this._players[p.order].updatePlayers(p); });
        this._turn = g.turn;
    };
    Game._gameIdCounter = 0;
    return Game;
}());
exports.default = Game;
//# sourceMappingURL=Game.js.map