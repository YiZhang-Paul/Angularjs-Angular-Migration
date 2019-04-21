import { Injectable } from '@angular/core';

import { ChannelHttpService } from '../../core/services/http/channel-http/channel-http.service';

@Injectable({
    providedIn: 'root'
})
export class ChannelService {

    private _channelHttp: ChannelHttpService;

    constructor(channelHttp: ChannelHttpService) {

        this._channelHttp = channelHttp;
    }

    private isSameChannel(a: any, b: any): boolean {

        if (!a || !b || a.provider_id !== b.provider_id) {

            return false;
        }

        return a.provider_channel_id === b.provider_channel_id;
    }

    public refreshChannels(outdated: any[], updated: any[]): void {

        for (let i = 0; i < updated.length; i++) {

            if (!this.isSameChannel(outdated[i], updated[i])) {

                outdated[i] = updated[i];

                continue;
            }

            outdated[i].title = updated[i].title;
            outdated[i].view_count = updated[i].view_count;
            outdated[i].streamer_name = updated[i].streamer_name;
        }
    }

    public async loadFeaturedChannels(cache: any[]): Promise<void> {

        try {

            const channels = await this._channelHttp.getChannels();
            this.refreshChannels(cache, channels);
        }
        catch (error) {

            console.log(error);
        }
    }

    public async loadGameChannels(cache: any[], id: number): Promise<void> {

        try {

            const channels = await this._channelHttp.getChannelsByGameId(id);
            this.refreshChannels(cache, channels);
        }
        catch (error) {

            console.log(error);
        }
    }
}
