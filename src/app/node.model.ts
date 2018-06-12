import {Move} from './move.model';
import {BoardTile} from './board/board-tile/board-tile.model';

export class Node {
  prevMoves: Move[];
  board: BoardTile[][];
  h: number;
  blankTile: BoardTile;

  constructor(prevMoves: Move[], board: BoardTile[][], h: number, blankTile: BoardTile) {
    this.prevMoves = prevMoves;
    this.board = board;
    this.h = h;
    this.blankTile = blankTile;
  }
}
