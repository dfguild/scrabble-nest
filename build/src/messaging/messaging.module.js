"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingModule = void 0;
var common_1 = require("@nestjs/common");
var messaging_controller_1 = require("./messaging.controller");
var messaging_service_1 = require("./messaging.service");
var MessagingModule = /** @class */ (function () {
    function MessagingModule() {
    }
    MessagingModule = __decorate([
        common_1.Module({
            controllers: [messaging_controller_1.MessagingController],
            providers: [messaging_service_1.MessagingService],
        })
    ], MessagingModule);
    return MessagingModule;
}());
exports.MessagingModule = MessagingModule;
//# sourceMappingURL=messaging.module.js.map