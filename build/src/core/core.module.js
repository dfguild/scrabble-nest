"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
var common_1 = require("@nestjs/common");
var player_game_store_service_1 = require("./player-game-store.service");
var update_clients_gateway_1 = require("./update-clients.gateway");
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        common_1.Module({
            imports: [],
            controllers: [],
            providers: [player_game_store_service_1.PlayerGameStoreService, update_clients_gateway_1.UpdateClientsGateway],
            exports: [player_game_store_service_1.PlayerGameStoreService, update_clients_gateway_1.UpdateClientsGateway],
        })
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map