import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { GameCardComponent } from './game-card/game-card.component';
import { GameListComponent } from './game-list/game-list.component';

@NgModule({
    imports: [SharedModule],
    declarations: [
        GameCardComponent,
        GameListComponent
    ],
    entryComponents: [
        GameListComponent
    ],
    exports: [GameCardComponent]
})
export class GameModule { }
