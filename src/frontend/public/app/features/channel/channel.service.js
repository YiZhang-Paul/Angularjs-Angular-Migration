export class ChannelService {

    constructor(channelHttpService) {
        'ngInject';
        this.channelHttp = channelHttpService;
    }

    _isSameChannel(a, b) {

        if (!a || !b || a.provider_id !== b.provider_id) {

            return false;
        }

        return a.provider_channel_id === b.provider_channel_id;
    }

    refreshChannels(outdated, updated) {

        for (let i = 0; i < updated.length; i++) {

            if (!this._isSameChannel(outdated[i], updated[i])) {

                outdated[i] = updated[i];

                continue;
            }

            outdated[i].title = updated[i].title;
            outdated[i].view_count = updated[i].view_count;
            outdated[i].streamer_name = updated[i].streamer_name;
        }
    }

    loadFeaturedChannels(cache) {

        return this.channelHttp.getChannels().then(channels => {

            this.refreshChannels(cache, channels);
        })
        .catch(error => console.log(error));
    }

    loadGameChannels(cache, id) {

        return this.channelHttp.getChannelsByGameId(id).then(channels => {

            this.refreshChannels(cache, channels);
        })
        .catch(error => console.log(error));
    }
}
