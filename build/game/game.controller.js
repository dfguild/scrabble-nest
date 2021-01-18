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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var GameController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const common_1 = require("@nestjs/common");
const game_service_1 = require("./game.service");
const Game_dto_1 = require("./Game-dto");
const player_game_store_service_1 = require("../core/player-game-store.service");
const move_gateway_1 = require("../move/move.gateway");
let GameController = GameController_1 = class GameController {
    constructor(_gameService, _playerGameStore, _moveGateway) {
        this._gameService = _gameService;
        this._playerGameStore = _playerGameStore;
        this._moveGateway = _moveGateway;
        this._logger = new common_1.Logger(GameController_1.name);
    }
    //Create Game API
    create(gameCreateInDto) {
        this._logger.debug(`:create calling gameCreate DTO in: ${JSON.stringify(gameCreateInDto)}`);
        this._gameService.create(gameCreateInDto);
        return this._playerGameStore.getGames();
    }
    //Join Game API
    join(gameCreateInDto) {
        this._gameService.join(gameCreateInDto);
        this._moveGateway.onGameJoin(gameCreateInDto);
        return this._playerGameStore.getGames();
    }
    get() {
        const g = this._playerGameStore.getGames();
        this._logger.debug(`games: ${JSON.stringify(g)}`);
        return g;
    }
};
__decorate([
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Game_dto_1.GameCreateInDto]),
    __metadata("design:returntype", Array)
], GameController.prototype, "create", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Game_dto_1.GameCreateInDto]),
    __metadata("design:returntype", Array)
], GameController.prototype, "join", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], GameController.prototype, "get", null);
GameController = GameController_1 = __decorate([
    common_1.Controller('api/game'),
    __metadata("design:paramtypes", [game_service_1.GameService,
        player_game_store_service_1.PlayerGameStoreService,
        move_gateway_1.MoveGateway])
], GameController);
exports.GameController = GameController;
//# sourceMappingURL=game.controller.js.map