"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Players_dto_1 = require("../players/Players.dto");
class Player {
    constructor(playerName, tileBag) {
        this.playerName = playerName.toUpperCase();
        this.score = 0;
        this.order = Player.orderCount++;
        this.tileBag = tileBag;
        this.tileRack = this.tileBag.getTiles(7);
    }
    _tilesToArray() {
        const rackArray = [];
        for (const char of this.tileRack) {
            rackArray.push(char);
        }
        return rackArray;
    }
    updatePlayers(player) {
        this.score = player.score;
        if (player.tiles.length >= 1) {
            this.tileRack = player.tiles;
        }
    }
    toPlayerDTO() {
        const player = new Players_dto_1.PlayerDTO();
        player.player_name = this.playerName;
        player.tiles = this._tilesToArray();
        player.order = this.order;
        player.score = this.score;
        return player;
    }
}
exports.default = Player;
Player.orderCount = 0;
//# sourceMappingURL=Player.js.map