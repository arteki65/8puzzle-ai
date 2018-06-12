import {Component, OnInit} from '@angular/core';
import {BoardTile} from './board-tile/board-tile.model';
import {GreedySearchService} from '../greedy-search.service';
import {Move} from '../move.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: BoardTile[][] = [];
  tiles: BoardTile[] = [];
  blankTile: BoardTile;
  prevDist = 1;
  h = 0;

  constructor(private greedySearch: GreedySearchService) {
    const tiles: BoardTile[] = [];
    tiles.push(new BoardTile(0, 2, 2));
    tiles.push(new BoardTile(1, 1, 1));
    tiles.push(new BoardTile(2, 2, 1));
    tiles.push(new BoardTile(3, 3, 1));
    tiles.push(new BoardTile(4, 3, 2));
    tiles.push(new BoardTile(5, 3, 3));
    tiles.push(new BoardTile(6, 2, 3));
    tiles.push(new BoardTile(7, 1, 3));
    tiles.push(new BoardTile(8, 1, 2));

    let value = 0;
    for (let i = 0; i < 3; i++) {
      this.board[i] = [];
      for (let j = 0; j < 3; j++) {
        const tile = tiles[value++];
        this.board[i][j] = tile;
        tile.setY(i + 1);
        tile.setX(j + 1);
      }
    }

    this.blankTile = this.board[0][0];
    console.log(this.blankTile);
    this.tiles = tiles;
    this.h = this.greedySearch.evaluateH(this.board);
  }

  ngOnInit() {
  }

  move() {
    this.moveBlank();
    this.h = this.greedySearch.evaluateH(this.board);
  }

  resolve() {
    const moves: Move[] = this.greedySearch.resolve(this.board, this.blankTile);
    console.log('result moves', moves);
    let i = 0;
    moves.forEach((move, index) => {
      console.log('make move ' + i++, move);
      setTimeout(() => this.blankTile.move(move, this.board), 300 * (index + 1));
      // this.blankTile.move(move, this.board);
    });
  }

  private moveBlank() {
    const move = this.blankTile.possibleMoves()[0];
    this.blankTile.move(move, this.board);
  }
}
