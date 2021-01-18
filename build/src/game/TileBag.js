"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants = require("../Constants");
var TileBag = /** @class */ (function () {
    function TileBag() {
        this.tileBag = [];
        for (var _i = 0, _a = Constants.tiles; _i < _a.length; _i++) {
            var i = _a[_i];
            this.tileBag.push(i);
        }
    }
    TileBag.prototype._getTile = function () {
        if (this._bagEmpty()) {
            return ''; // no tiles left
        }
        else {
            var index = Math.floor(Math.random() * this.tileBag.length);
            var letter = this.tileBag[index];
            this.tileBag.splice(index, 1);
            return letter;
        }
    };
    TileBag.prototype._bagEmpty = function () {
        return this.tileBag.length === 0;
    };
    TileBag.prototype.getTiles = function (numTile) {
        numTile = Math.min(numTile, this.tileBag.length);
        var tileRack = [];
        for (var i = 0; i < numTile; i++)
            tileRack.push(this._getTile());
        return tileRack;
    };
    TileBag.prototype.setTileBag = function (tiles) {
        this.tileBag = tiles;
    };
    TileBag.prototype.toArray = function () {
        var outArray = [];
        for (var _i = 0, _a = this.tileBag; _i < _a.length; _i++) {
            var letter = _a[_i][0];
            outArray.push(letter);
        }
        return outArray;
    };
    return TileBag;
}());
exports.default = TileBag;
//# sourceMappingURL=TileBag.js.map