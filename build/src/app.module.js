"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var game_module_1 = require("./game/game.module");
var move_module_1 = require("./move/move.module");
var messaging_module_1 = require("./messaging/messaging.module");
var core_module_1 = require("./core/core.module");
var players_module_1 = require("./players/players.module");
var app_logger_middleware_1 = require("./app-logger-middleware");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer.apply(app_logger_middleware_1.AppLoggerMiddleware).forRoutes('*');
    };
    AppModule = __decorate([
        common_1.Module({
            imports: [
                /*    ServeStaticModule.forRoot({
                      rootPath: join(__dirname, '..', 'public'),
                    }), */
                game_module_1.GameModule,
                move_module_1.MoveModule,
                messaging_module_1.MessagingModule,
                core_module_1.CoreModule,
                players_module_1.PlayersModule,
            ],
            controllers: [],
            providers: [],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map