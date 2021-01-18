"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid = /** @class */ (function () {
    function Grid() {
        this.grid = [];
        for (var r = 0; r < 15; r++) {
            var row = [];
            for (var c = 0; c < 15; c++) {
                row.push('');
            }
            this.grid.push(row);
        }
    }
    Grid.prototype.fromArray = function (grid) {
        var _this = this;
        grid.map(function (row, r) { return row.map(function (letter, c) { return (_this.grid[r][c] = letter); }); });
    };
    Grid.prototype.toArray = function () {
        return this.grid;
    };
    return Grid;
}());
exports.default = Grid;
//# sourceMappingURL=Grid.js.map