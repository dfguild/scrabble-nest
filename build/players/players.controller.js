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
var PlayersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersController = void 0;
const common_1 = require("@nestjs/common");
const player_game_store_service_1 = require("../core/player-game-store.service");
let PlayersController = PlayersController_1 = class PlayersController {
    constructor(playerGameStore) {
        this.playerGameStore = playerGameStore;
        this._logger = new common_1.Logger(PlayersController_1.name);
    }
    getPlayers() {
        this._logger.debug('In getPlayers');
        const i = this.playerGameStore.getPlayerNamesDto();
        this._logger.debug(`players: ${i.length}-${i.toString}`);
        return i;
    }
    addPlayer(nameObj) {
        this._logger.debug(`In players addPlayer name: ${nameObj.name}`);
        this.playerGameStore.addPlayerName(nameObj.name);
    }
};
__decorate([
    common_1.Get(),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], PlayersController.prototype, "getPlayers", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "addPlayer", null);
PlayersController = PlayersController_1 = __decorate([
    common_1.Controller('api/players'),
    __metadata("design:paramtypes", [player_game_store_service_1.PlayerGameStoreService])
], PlayersController);
exports.PlayersController = PlayersController;
//# sourceMappingURL=players.controller.js.map