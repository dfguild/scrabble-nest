"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModule = void 0;
var common_1 = require("@nestjs/common");
var game_controller_1 = require("./game.controller");
var game_service_1 = require("./game.service");
var core_module_1 = require("../core/core.module");
var move_module_1 = require("../move/move.module");
var GameModule = /** @class */ (function () {
    function GameModule() {
    }
    GameModule = __decorate([
        common_1.Module({
            imports: [core_module_1.CoreModule, move_module_1.MoveModule],
            controllers: [game_controller_1.GameController],
            providers: [game_service_1.GameService],
        })
    ], GameModule);
    return GameModule;
}());
exports.GameModule = GameModule;
//# sourceMappingURL=game.module.js.map