export class GameDTO {
  id: string = '';
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
  id: string;
  playerName: string;
}

export class GameListItem {
  gameName: string = '';
  id: string = '';
  gameTurn: number = 0;
  gamePlayers: string[] = [];
  totalMoves: number = 0;
  gameState: GameState = GameState.NotStarted;
}

export type GameListDTO = GameListItem[];
