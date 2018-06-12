export class Move {
  dist: number;
  direction: 'x' | 'y';


  constructor(dist: number, direction: 'x' | 'y') {
    this.dist = dist;
    this.direction = direction;
  }

  isOposite(move: Move) {
    return this.direction === move.direction && this.dist === -move.dist;
  }
}
