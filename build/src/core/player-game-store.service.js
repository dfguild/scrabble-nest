"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerGameStoreService = void 0;
var common_1 = require("@nestjs/common");
var Game_dto_1 = require("../game/Game-dto");
var PlayerGameStoreService = /** @class */ (function () {
    function PlayerGameStoreService() {
        this._gameToPlayers = new Map();
        this._gameNameToGame = new Map();
        this._players = [];
        this._logger = new common_1.Logger(PlayerGameStoreService_1.name);
    }
    PlayerGameStoreService_1 = PlayerGameStoreService;
    PlayerGameStoreService.prototype.newGame = function (game) {
        this._gameNameToGame.set(game.gameName, game);
        this._gameToPlayers.set(game, [game.gamePlayers[0].playerName]);
        this._logger.debug(":newGame gameName to Game items: " + this._gameNameToGame.size);
        this._logger.debug(":newGame g to Ps: size:" + this._gameToPlayers.size + " Ps:" + Object.values(this._gameToPlayers));
    };
    PlayerGameStoreService.prototype.addPlayerName = function (playerName) {
        playerName = playerName.toUpperCase();
        this._logger.debug(":addPlayerName for player: " + playerName);
        if (this._players.includes(playerName))
            return;
        this._players.push(playerName);
    };
    PlayerGameStoreService.prototype.addModifyGame = function (game) {
        for (var _i = 0, _a = game.gamePlayers; _i < _a.length; _i++) {
            var playerObj = _a[_i];
            var player = playerObj.playerName;
            this._updateGtoPs(player, game);
        }
        this._logger.debug("addPlayertoGame gToP: " + JSON.stringify(this._gameToPlayers));
    };
    PlayerGameStoreService.prototype.getGame = function (gameName) {
        return this._gameNameToGame.get(gameName);
    };
    PlayerGameStoreService.prototype.getGames = function () {
        var gameList = [];
        for (var _i = 0, _a = this._gameToPlayers; _i < _a.length; _i++) {
            var _b = _a[_i], game = _b[0], players = _b[1];
            var itemObj = new Game_dto_1.GameListItem();
            itemObj.gameId = game.gameId;
            itemObj.gameName = game.gameName;
            itemObj.gamePlayers = players;
            itemObj.gameTurn = game.gameTurn;
            gameList.push(itemObj);
        }
        return gameList;
    };
    PlayerGameStoreService.prototype.getPlayerNamesDto = function () {
        this._logger.debug(JSON.stringify(this._players));
        return this._players;
    };
    PlayerGameStoreService.prototype._updateGtoPs = function (player, game) {
        if (this._gameToPlayers.has(game)) {
            if (this._gameToPlayers.get(game).includes(player))
                return;
            this._gameToPlayers.get(game).push(player);
        }
        else {
            this._gameToPlayers.set(game, [player]);
        }
    };
    var PlayerGameStoreService_1;
    PlayerGameStoreService = PlayerGameStoreService_1 = __decorate([
        common_1.Injectable()
    ], PlayerGameStoreService);
    return PlayerGameStoreService;
}());
exports.PlayerGameStoreService = PlayerGameStoreService;
//# sourceMappingURL=player-game-store.service.js.map