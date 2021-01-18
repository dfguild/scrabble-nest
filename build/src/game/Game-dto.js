"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameListItem = exports.GameCreateInDto = exports.GameDTO = void 0;
var GameDTO = /** @class */ (function () {
    function GameDTO() {
    }
    return GameDTO;
}());
exports.GameDTO = GameDTO;
var GameCreateInDto = /** @class */ (function () {
    function GameCreateInDto() {
    }
    return GameCreateInDto;
}());
exports.GameCreateInDto = GameCreateInDto;
var GameListItem = /** @class */ (function () {
    function GameListItem() {
        this.gameName = '';
        this.gameId = 0;
        this.gameTurn = 0;
        this.gamePlayers = [];
    }
    return GameListItem;
}());
exports.GameListItem = GameListItem;
//# sourceMappingURL=Game-dto.js.map