"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PlayerGameStoreService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerGameStoreService = void 0;
const common_1 = require("@nestjs/common");
const Game_dto_1 = require("../game/Game-dto");
let PlayerGameStoreService = PlayerGameStoreService_1 = class PlayerGameStoreService {
    constructor() {
        this._gameToPlayers = new Map();
        this._gameNameToGame = new Map();
        this._players = [];
        this._logger = new common_1.Logger(PlayerGameStoreService_1.name);
    }
    newGame(game) {
        this._gameNameToGame.set(game.gameName, game);
        this._gameToPlayers.set(game, [game.gamePlayers[0].playerName]);
        this._logger.debug(`:newGame gameName to Game items: ${this._gameNameToGame.size}`);
        this._logger.debug(`:newGame g to Ps: size:${this._gameToPlayers.size} Ps:${Object.values(this._gameToPlayers)}`);
    }
    addPlayerName(playerName) {
        playerName = playerName.toUpperCase();
        this._logger.debug(`:addPlayerName for player: ${playerName}`);
        if (this._players.includes(playerName))
            return;
        this._players.push(playerName);
    }
    addModifyGame(game) {
        for (const playerObj of game.gamePlayers) {
            const player = playerObj.playerName;
            this._updateGtoPs(player, game);
        }
        this._logger.debug(`addPlayertoGame gToP: ${JSON.stringify(this._gameToPlayers)}`);
    }
    getGame(gameName) {
        return this._gameNameToGame.get(gameName);
    }
    getGames() {
        const gameList = [];
        this._gameToPlayers.forEach((players, game) => {
            const itemObj = new Game_dto_1.GameListItem();
            itemObj.gameId = game.gameId;
            itemObj.gameName = game.gameName;
            itemObj.gamePlayers = players;
            itemObj.gameTurn = game.gameTurn;
            gameList.push(itemObj);
        });
        return gameList;
    }
    getPlayerNamesDto() {
        this._logger.debug(JSON.stringify(this._players));
        return this._players;
    }
    _updateGtoPs(player, game) {
        if (this._gameToPlayers.has(game)) {
            if (this._gameToPlayers.get(game).includes(player))
                return;
            this._gameToPlayers.get(game).push(player);
        }
        else {
            this._gameToPlayers.set(game, [player]);
        }
    }
};
PlayerGameStoreService = PlayerGameStoreService_1 = __decorate([
    common_1.Injectable()
], PlayerGameStoreService);
exports.PlayerGameStoreService = PlayerGameStoreService;
//# sourceMappingURL=player-game-store.service.js.map