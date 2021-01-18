"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Players_dto_1 = require("../players/Players.dto");
var Player = /** @class */ (function () {
    function Player(playerName, tileBag) {
        this.playerName = playerName.toUpperCase();
        this.score = 0;
        this.order = Player.orderCount++;
        this.tileBag = tileBag;
        this.tileRack = this.tileBag.getTiles(7);
    }
    Player.prototype._tilesToArray = function () {
        var rackArray = [];
        for (var _i = 0, _a = this.tileRack; _i < _a.length; _i++) {
            var char = _a[_i][0];
            rackArray.push(char);
        }
        return rackArray;
    };
    Player.prototype.updatePlayers = function (player) {
        var _a;
        this.score = player.score;
        if (((_a = player.tiles) === null || _a === void 0 ? void 0 : _a.length) >= 1) {
            this.tileRack = player.tiles;
        }
    };
    Player.prototype.toPlayerDTO = function () {
        var player = new Players_dto_1.PlayerDTO();
        player.player_name = this.playerName;
        player.tiles = this._tilesToArray();
        player.order = this.order;
        player.score = this.score;
        return player;
    };
    Player.orderCount = 0;
    return Player;
}());
exports.default = Player;
//# sourceMappingURL=Player.js.map