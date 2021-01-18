"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Grid {
    constructor() {
        this.grid = [];
        for (let r = 0; r < 15; r++) {
            const row = [];
            for (let c = 0; c < 15; c++) {
                row.push('');
            }
            this.grid.push(row);
        }
    }
    fromArray(grid) {
        grid.map((row, r) => row.map((letter, c) => (this.grid[r][c] = letter)));
    }
    toArray() {
        return this.grid;
    }
}
exports.default = Grid;
//# sourceMappingURL=Grid.js.map