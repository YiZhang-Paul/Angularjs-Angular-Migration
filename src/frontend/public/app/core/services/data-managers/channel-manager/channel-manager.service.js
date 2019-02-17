export class ChannelManagerService {

    constructor(channelHttpService) {
        'ngInject';
        this.channelService = channelHttpService;
    }
    // TODO: remove this and use channel http service instead
    getChannelsByGameId(id) {

        return this.channelService.getChannelsByGameId(id).catch(error => {

            console.log(error);

            return [];
        });
    }
    // TODO: move to shared channel service (in channel module)
    _isSameChannel(a, b) {

        if (!a || !b || a.provider_id !== b.provider_id) {

            return false;
        }

        return a.provider_channel_id === b.provider_channel_id;
    }
    // TODO: move to shared channel service (in channel module)
    _syncChannel(outdated, updated) {

        outdated.streamer_name = updated.streamer_name;
        outdated.title = updated.title;
        outdated.view_count = updated.view_count;
    }
    // TODO: move to shared channel service (in channel module)
    refreshChannels(outdated, updated) {

        for (let i = 0; i < updated.length; i++) {

            if (!this._isSameChannel(outdated[i], updated[i])) {

                outdated[i] = updated[i];

                continue;
            }

            this._syncChannel(outdated[i], updated[i]);
        }
    }
}
