import {Injectable} from '@angular/core';
import {BoardTile} from './board/board-tile/board-tile.model';
import {Node} from './node.model';
import {Move} from './move.model';

@Injectable({
  providedIn: 'root'
})
export class GreedySearchService {

  constructor() {
  }

  resolve(board: BoardTile[][], blankTile: BoardTile): Move[] {
    const currentBlankTile = blankTile.copy();
    console.log('currentBlankTile', currentBlankTile);

    const possibleMoves = currentBlankTile.possibleMoves();
    console.log('possibleMoves', possibleMoves);

    const nodes: Node[] = [];

    // iterate possible moves and produce next nodes
    possibleMoves.forEach(move => {
      const boardForMove = this.copyBoard(board);
      const blankTileForMove = blankTile.copy();

      blankTileForMove.move(move, boardForMove);
      const moves = [];
      moves.push(move);
      nodes.push(new Node(moves, boardForMove, this.evaluateH(boardForMove), blankTileForMove));
    });

    // iterate through nodes, choose lowest h, make moves, add nodes...
    const result: Node = this.iterateNodes(nodes, 0);

    console.log('greedy search result', result);
    return result.prevMoves;
  }

  iterateNodes(nodes: Node[], deep) {
    let lowestH = Number.MAX_SAFE_INTEGER;
    let chosenNode = null;
    let chosenNodeIndex = 0;
    nodes.forEach((node, i) => {
      if (node.h < lowestH) {
        lowestH = node.h;
        chosenNode = node;
        chosenNodeIndex = i;
      }
    });

    // resolved
    if (chosenNode.h === 0 || deep === 1000) {
      return chosenNode;
    }

    // REMOVE CHOSEN NODE!!!
    nodes.splice(chosenNodeIndex, 1);

    // make possible moves, add nodes
    const possibleMoves = chosenNode.blankTile.possibleMoves();
    possibleMoves.forEach(move => {
      if (!chosenNode.prevMoves[chosenNode.prevMoves.length - 1].isOposite(move)) {
        const boardForMove = this.copyBoard(chosenNode.board);
        const blankTileForMove = chosenNode.blankTile.copy();

        blankTileForMove.move(move, boardForMove);
        const moves = chosenNode.prevMoves.map(moveEl => new Move(moveEl.dist, moveEl.direction));
        moves.push(move);
        nodes.push(new Node(moves, boardForMove, this.evaluateH(boardForMove), blankTileForMove));
      }
    });
    return this.iterateNodes(nodes, ++deep);
  }

  copyBoard(board) {
    const copiedBoard: BoardTile[][] = [];
    board.forEach((row, i) => {
      copiedBoard[i] = [];
      row.forEach(tile => {
        copiedBoard[i].push(tile.copy());
      });
    });
    return copiedBoard;
  }

  evaluateH(board: BoardTile[][]) {
    let h = 0;
    board.forEach(row => {
      row.forEach(tile => {
          if (!tile.isOk()) {
            h++;
          }
        }
      );
    });
    return h;
    /*let h = 0;
    board.forEach(row => {
      row.forEach(tile => {
          h += tile.manhatanDist();
        }
      );
    });
    return h;*/
  }
}
