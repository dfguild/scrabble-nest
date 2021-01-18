export class GameDTO {
  gameId: number = NaN;
  gameName: string = '';
  turn: number = 0;
  totalMoves: number = 0;
  gameState: GameState = GameState.NotStarted;
  gameMessage: string = '';
  passCounter: number = 0;
  gameDate: string = '';
  grid: string[][] = [];
  players: PlayerDTO[] = [];
  remainingTiles: string[] = [];
}

export enum GameState {
  NotStarted,
  InPlay,
  GameOver,
}

export class PlayerDTO {
  order: number = 0;
  player_name: string = '';
  score: number = 0;
  tiles: string[] = [];
}

export class GameCreateInDto {
  gameName: string;
  gameId: number;
  playerName: string;
}

export class GameListItem {
  gameName: string = '';
  gameId: number = 0;
  gameTurn: number = 0;
  gamePlayers: string[] = [];
  totalMoves: number = 0;
  gameState: GameState = GameState.NotStarted;
}

export type GameListDTO = GameListItem[];
