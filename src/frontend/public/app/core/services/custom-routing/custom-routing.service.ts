import { Injectable } from '@angular/core';

import { $state } from '../../upgraded-providers/$state-provider/$state-provider';
import { ChannelHttpService } from '../http/channel-http/channel-http.service';
import { GameHttpService } from '../http/game-http/game-http.service';
import { GenericUtilitiesService } from '../utilities/generic-utilities/generic-utilities.service';

@Injectable({
    providedIn: 'root'
})
export class CustomRoutingService {

    private _$state: $state;
    private _channelHttp: ChannelHttpService;
    private _gameHttp: GameHttpService;
    private _utilities: GenericUtilitiesService;

    constructor(

        $state: $state,
        channelHttp: ChannelHttpService,
        gameHttp: GameHttpService,
        utilities: GenericUtilitiesService

    ) {
        this._$state = $state;
        this._channelHttp = channelHttp;
        this._gameHttp = gameHttp;
        this._utilities = utilities;
    }

    public toState(state) {

        this._$state.go(state);
    }

    public toChannelsView(id) {

        const gamePromise = this._gameHttp.getGame(id);
        const channelsPromise = this._channelHttp.getChannelsByGameId(id);

        Promise.all([gamePromise, channelsPromise]).then(responses => {

            const [game, channels] = responses;
            const name = this._utilities.joinText(game.name);

            this._$state.go('index.channels', { name, channels });
        })
        .catch(error => console.log(error));
    }
}
