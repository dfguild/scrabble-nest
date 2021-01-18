"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
var common_1 = require("@nestjs/common");
var Game_1 = require("./Game");
var player_game_store_service_1 = require("../core/player-game-store.service");
var GameService = /** @class */ (function () {
    function GameService(gameStore) {
        this.gameStore = gameStore;
        this._logger = new common_1.Logger(GameService_1.name);
    }
    GameService_1 = GameService;
    GameService.prototype.create = function (gameCreateInDto) {
        var game = new Game_1.default(gameCreateInDto);
        this.gameStore.newGame(game);
        this.gameStore.addModifyGame(game);
        this._logger.debug('Created Game: Verbose to display');
        this._logger.verbose(game.getGameDto());
        return true;
    };
    GameService.prototype.join = function (gcreateDTO) {
        var game = this.gameStore.getGame(gcreateDTO.gameName);
        this._logger.debug("joining game with: " + JSON.stringify(gcreateDTO));
        game.joinGame(gcreateDTO);
        this._logger.verbose("game as modified DTO:" + JSON.stringify(game.getGameDto()));
        this._logger.debug('calling addPlayertoGame');
        this.gameStore.addModifyGame(game);
        return true;
    };
    var GameService_1;
    GameService = GameService_1 = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [player_game_store_service_1.PlayerGameStoreService])
    ], GameService);
    return GameService;
}());
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map