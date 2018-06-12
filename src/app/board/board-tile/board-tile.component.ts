import {Component, Input, OnInit} from '@angular/core';
import {BoardTile} from './board-tile.model';

@Component({
  selector: 'app-board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.css']
})
export class BoardTileComponent implements OnInit {
  @Input() tile: BoardTile;

  constructor() { }

  ngOnInit() {
  }

  getColor() {
    if (this.tile.isBlank()) {
      return 'white';
    }
    return '#888';
  }
}
