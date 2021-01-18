"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const game_module_1 = require("./game/game.module");
const move_module_1 = require("./move/move.module");
const messaging_module_1 = require("./messaging/messaging.module");
const core_module_1 = require("./core/core.module");
const players_module_1 = require("./players/players.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [game_module_1.GameModule, move_module_1.MoveModule, messaging_module_1.MessagingModule, core_module_1.CoreModule, players_module_1.PlayersModule],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map