"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLoggerMiddleware = void 0;
var common_1 = require("@nestjs/common");
var AppLoggerMiddleware = /** @class */ (function () {
    function AppLoggerMiddleware() {
        this.logger = new common_1.Logger('HTTP');
    }
    AppLoggerMiddleware.prototype.use = function (request, response, next) {
        var _this = this;
        var ip = request.ip, method = request.method, url = request.path;
        var userAgent = request.get('user-agent') || '';
        var referer = request.get('referer') || '';
        response.on('close', function () {
            var statusCode = response.statusCode;
            var contentLength = response.get('content-length');
            _this.logger.log(method + " url:" + url + " cd:" + statusCode + " length:" + contentLength + " ref:" + referer + " UA:" + userAgent + " ip:" + ip);
        });
        next();
    };
    AppLoggerMiddleware = __decorate([
        common_1.Injectable()
    ], AppLoggerMiddleware);
    return AppLoggerMiddleware;
}());
exports.AppLoggerMiddleware = AppLoggerMiddleware;
//# sourceMappingURL=app-logger-middleware.js.map