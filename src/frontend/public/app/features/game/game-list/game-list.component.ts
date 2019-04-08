import { Component, OnDestroy, OnInit } from '@angular/core';

import { CustomRoutingService } from '../../../core/services/custom-routing/custom-routing.service';
import { GameManager } from '../../../core/upgraded-providers/game-manager-provider/game-manager-provider';

@Component({
    selector: 'game-list',
    styles: [`${require('./game-list.scss')}`],
    template: require('./game-list.html')
})
export class GameListComponent implements OnInit, OnDestroy {

    private _task: any = null;
    private _routingService: CustomRoutingService;
    private _gameManager: GameManager;

    constructor(

        routingService: CustomRoutingService,
        gameManager: GameManager

    ) {

        this._routingService = routingService;
        this._gameManager = gameManager;
    }

    get games(): any {

        return this._gameManager.games;
    }

    public ngOnInit(): void {

        this._gameManager.cacheGames();

        this._task = setInterval(() => {

            this._gameManager.cacheGames();

        }, 10 * 1000);
    }

    public toChannelsView(game: any): void {

        this._routingService.toChannelsView(game.id);
    }

    public ngOnDestroy(): void {

        clearInterval(this._task);
    }
}
