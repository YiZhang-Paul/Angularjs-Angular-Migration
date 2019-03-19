import { NgModule } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';

import { SharedModule } from '../../shared/shared.module';

import { GameCardComponent } from './game-card/game-card.component';
import * as GameModuleAjs from './game.module.ajs.js';

@NgModule({
    imports: [SharedModule],
    declarations: [GameCardComponent],
    entryComponents: [GameCardComponent]
})
export class GameModule { }

angular.module(GameModuleAjs.default)
    .directive('gameCard', downgradeComponent({ component: GameCardComponent }));
