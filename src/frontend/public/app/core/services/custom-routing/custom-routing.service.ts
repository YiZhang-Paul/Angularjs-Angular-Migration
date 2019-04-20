import { Injectable } from '@angular/core';
import { StateService } from '@uirouter/angular';

import { ChannelHttpService } from '../http/channel-http/channel-http.service';
import { GameHttpService } from '../http/game-http/game-http.service';
import { GenericUtilitiesService } from '../utilities/generic-utilities/generic-utilities.service';

@Injectable({
    providedIn: 'root'
})
export class CustomRoutingService {

    private _state: StateService;
    private _channelHttp: ChannelHttpService;
    private _gameHttp: GameHttpService;
    private _utilities: GenericUtilitiesService;

    constructor(

        state: StateService,
        channelHttp: ChannelHttpService,
        gameHttp: GameHttpService,
        utilities: GenericUtilitiesService

    ) {

        this._state = state;
        this._channelHttp = channelHttp;
        this._gameHttp = gameHttp;
        this._utilities = utilities;
    }

    public toState(state: string): void {

        this._state.go(state);
    }

    public async toChannelsView(id: number, state = 'channels'): Promise<void> {

        const gamePromise = this._gameHttp.getGame(id);
        const channelsPromise = this._channelHttp.getChannelsByGameId(id);

        try {

            const [game, channels] = await Promise.all([gamePromise, channelsPromise]);
            const name = this._utilities.joinText(game.name);

            this._state.go(state, { name, channels });
        }
        catch (error) {

            console.log(error);
        }
    }
}
