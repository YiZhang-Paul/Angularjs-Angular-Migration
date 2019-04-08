import { NgModule } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';

import { SharedModule } from '../../shared/shared.module';

import { GameCardComponent } from './game-card/game-card.component';
import { GameListComponent } from './game-list/game-list.component';
import * as GameModuleAjs from './game.module.ajs.js';

@NgModule({
    imports: [SharedModule],
    declarations: [
        GameCardComponent,
        GameListComponent
    ],
    entryComponents: [
        GameCardComponent,
        GameListComponent
    ],
    exports: [GameCardComponent]
})
export class GameModule { }

angular.module(GameModuleAjs.default)
    .directive('gameCard', downgradeComponent({ component: GameCardComponent }))
    .directive('gameList', downgradeComponent({ component: GameListComponent }));
