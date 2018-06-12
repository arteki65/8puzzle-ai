import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BoardTileComponent } from './board/board-tile/board-tile.component';
import {GreedySearchService} from './greedy-search.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardTileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GreedySearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
