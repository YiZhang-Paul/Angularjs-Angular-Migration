import { Component, OnDestroy, OnInit } from '@angular/core';

import { CustomRoutingService } from '../../../core/services/custom-routing/custom-routing.service';
import { GameManagerService } from '../../../core/services/data-managers/game-manager/game-manager.service';

@Component({
    selector: 'game-list',
    styleUrls: ['./game-list.scss'],
    templateUrl: './game-list.html'
})
export class GameListComponent implements OnInit, OnDestroy {

    private _task: any = null;

    constructor(private _routingService: CustomRoutingService, private _gameManager: GameManagerService) { }

    get games(): any[] {

        return this._gameManager.games;
    }

    public ngOnInit(): void {

        this._gameManager.cacheGames();

        this._task = setInterval(() => {

            this._gameManager.cacheGames();

        }, 10 * 1000);
    }

    public ngOnDestroy(): void {

        clearInterval(this._task);
    }

    public toChannelsView(game: any): void {

        this._routingService.toChannelsView(game.id);
    }
}
