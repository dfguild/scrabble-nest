import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TileBagService {
  tileBag: string[] = [];
  logger = new Logger(TileBagService.name);

  private _getTile(): string {
    if (this._bagEmpty()) {
      return ''; // no tiles left
    } else {
      const index: number = Math.floor(Math.random() * this.tileBag.length);
      const letter = this.tileBag[index];
      this.tileBag.splice(index, 1);
      this.logger.debug(`:_getTile - tileBag has length=${this.tileBag.length} returning: ${letter}`);
      return letter;
    }
  }

  private _bagEmpty(): boolean {
    return this.tileBag.length === 0;
  }

  getTiles(tileRack: string[]): string[] {
    tileRack = tileRack.filter((t) => t !== '');
    this.logger.debug(`:getTiles Rack has ${tileRack.length} letters`);
    const numTile = Math.min(7 - tileRack.length, this.tileBag.length);
    for (let i = 0; i < numTile; i++) tileRack.push(this._getTile());
    return tileRack;
  }

  setTileBag(tiles: string[]) {
    this.tileBag = [...tiles];
    this.logger.debug(`:setTileBag with game bag of ${this.tileBag.length} letters`);
  }
}
