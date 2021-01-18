"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants = require("../Constants");
class TileBag {
    constructor() {
        this.tileBag = [];
        for (const i of Constants.tiles) {
            this.tileBag.push(i);
        }
    }
    _getTile() {
        if (this._bagEmpty()) {
            return ''; // no tiles left
        }
        else {
            const index = Math.floor(Math.random() * this.tileBag.length);
            const letter = this.tileBag[index];
            this.tileBag.splice(index, 1);
            return letter;
        }
    }
    _bagEmpty() {
        return this.tileBag.length === 0;
    }
    getTiles(numTile) {
        numTile = Math.min(numTile, this.tileBag.length);
        const tileRack = [];
        for (let i = 0; i < numTile; i++)
            tileRack.push(this._getTile());
        return tileRack;
    }
    setTileBag(tiles) {
        this.tileBag = tiles;
    }
    toArray() {
        const outArray = [];
        for (const letter of this.tileBag) {
            outArray.push(letter);
        }
        return outArray;
    }
}
exports.default = TileBag;
//# sourceMappingURL=TileBag.js.map