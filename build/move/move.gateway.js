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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const player_game_store_service_1 = require("../core/player-game-store.service");
const Game_dto_1 = require("../game/Game-dto");
let MoveGateway = class MoveGateway {
    constructor(pgStore) {
        this.pgStore = pgStore;
        this.logger = new common_1.Logger();
    }
    onGameStart(client, g) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameDto = this.pgStore.getGame(g.game).getGameDto();
            client.join(g.game); //join room of game name
            this.logger.debug(`:get gameDTO: ${JSON.stringify(gameDto)}`);
            this.sendGameDto(gameDto, client);
        });
    }
    onGameMove(client, g) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = this.pgStore.getGame(g.gameName);
            game.updateGame(g);
            game.incrementTurn(g.turn + 1);
            this.sendUpdateGameResponse(client, g.turn + 1);
            game.incrementTurn(game.gameTurn);
            this.sendGameDto(game.getGameDto());
        });
    }
    sendUpdateGameResponse(client, turn) {
        client.emit('gameUpdateResponse', turn);
    }
    onGameJoin(gInDto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug(`MoveGateway:onGameJoin - getting DTO`);
            this.server.to(gInDto.gameName).emit('gameJoinUpdate', this.pgStore.getGame(gInDto.gameName).getGameDto());
        });
    }
    //send game dto to correct room
    sendGameDto(g, socket) {
        this.logger.debug(`MoveGateway:onGameJoin - getting DTO with ${JSON.stringify(g)}`);
        if (socket) {
            socket.emit('gameDto', g);
        }
        else {
            this.server.to(g.gameName).emit('gameDto', g);
        }
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], MoveGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('startGame'),
    __param(0, websockets_1.ConnectedSocket()), __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], MoveGateway.prototype, "onGameStart", null);
__decorate([
    websockets_1.SubscribeMessage('updateGame'),
    __param(0, websockets_1.ConnectedSocket()), __param(1, websockets_1.MessageBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Game_dto_1.GameDTO]),
    __metadata("design:returntype", Promise)
], MoveGateway.prototype, "onGameMove", null);
MoveGateway = __decorate([
    websockets_1.WebSocketGateway({ origin: 'localhost:4000' }),
    __metadata("design:paramtypes", [player_game_store_service_1.PlayerGameStoreService])
], MoveGateway);
exports.MoveGateway = MoveGateway;
//# sourceMappingURL=move.gateway.js.map