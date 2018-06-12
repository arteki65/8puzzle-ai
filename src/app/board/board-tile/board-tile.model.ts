import {Move} from '../../move.model';

export class BoardTile {
  value: number;
  xPosition: number;
  yPosition: number;

  correctX: number;
  correctY: number;

  style: {
    'grid-column': string,
    'grid-row': string,
    'opacity': number
  };

  constructor(value: number, correctX: number, correctY: number) {
    this.value = value;
    this.xPosition = this.correctX = correctX;
    this.yPosition = this.correctY = correctY;
    this.style = {
      'grid-column': this.xPosition + ' / span 1',
      'grid-row': this.yPosition + ' / span 1',
      'opacity': 1
    };
  }

  isBlank() {
    return this.value === 0;
  }

  move(move: Move, board: BoardTile[][]) {
    if (move.direction === 'x') {
      const nextTileToMove = board[this.yPosition - 1][this.xPosition + move.dist - 1];
      this.xPosition = this.xPosition + move.dist;
      this.style['grid-column'] = this.xPosition + ' / span 1';

      nextTileToMove.xPosition = nextTileToMove.xPosition - move.dist;
      nextTileToMove.style['grid-column'] = nextTileToMove.xPosition + ' / span 1';
      board[nextTileToMove.yPosition - 1][nextTileToMove.xPosition - 1] = nextTileToMove;
    } else {
      const nextTileToMove = board[this.yPosition + move.dist - 1][this.xPosition - 1];
      this.yPosition = this.yPosition + move.dist;
      this.style['grid-row'] = this.yPosition + ' / span 1';

      nextTileToMove.yPosition = nextTileToMove.yPosition - move.dist;
      nextTileToMove.style['grid-row'] = nextTileToMove.yPosition + ' / span 1';
      board[nextTileToMove.yPosition - 1][nextTileToMove.xPosition - 1] = nextTileToMove;
    }
    board[this.yPosition - 1][this.xPosition - 1] = this;
  }

  describe() {
    return 'value: ' + this.value + '\n' + 'position: (' + this.xPosition + ', ' + this.yPosition + ')';
  }

  setX(x: number) {
    this.xPosition = x;
    this.style['grid-column'] = this.xPosition + ' / span 1';
  }

  setY(y: number) {
    this.yPosition = y;
    this.style['grid-row'] = this.yPosition + ' / span 1';
  }

  isOk() {
    return (this.isBlank()) ||
      (this.yPosition === this.correctY && this.xPosition === this.correctX);
  }

  possibleMoves(): Move[] {
    const moves: Move[] = [];
    if (this.xPosition + 1 <= 3) {
      moves.push(new Move(1, 'x'));
    }

    if (this.xPosition - 1 >= 1) {
      moves.push(new Move(-1, 'x'));
    }

    if (this.yPosition + 1 <= 3) {
      moves.push(new Move(1, 'y'));
    }

    if (this.yPosition - 1 >= 1) {
      moves.push(new Move(-1, 'y'));
    }
    return moves;
  }

  copy(): BoardTile {
    const copied = new BoardTile(this.value, this.correctX, this.correctY);
    copied.style = Object.assign({}, this.style);
    copied.xPosition = this.xPosition;
    copied.yPosition = this.yPosition;
    return copied;
  }
}
