export class ChannelService {

    constructor(bookmarkService, channelHttpService) {
        'ngInject';
        this.bookmarkService = bookmarkService;
        this.channelService = channelHttpService;
    }

    getChannelsByGameId(id) {

        return this.channelService.getChannelsByGameId(id).catch(error => {

            console.log(error);

            return [];
        });
    }

    _isSameChannel(a, b) {

        if (!a || !b || a.provider_id !== b.provider_id) {

            return false;
        }

        return a.provider_channel_id === b.provider_channel_id;
    }

    _syncChannel(outdated, updated) {

        outdated.streamer_name = updated.streamer_name;
        outdated.title = updated.title;
        outdated.view_count = updated.view_count;
    }

    refreshChannels(outdated, updated) {

        for (let i = 0; i < updated.length; i++) {

            if (!this._isSameChannel(outdated[i], updated[i])) {

                outdated[i] = updated[i];

                continue;
            }

            this._syncChannel(outdated[i], updated[i]);
        }
    }

    isFollowed(channel) {

        return this.bookmarkService.isFollowed(channel);
    }

    follow(channel) {

        return this.bookmarkService.follow(channel).catch(error => {

            console.log(error);
        });
    }

    unfollow(channel) {

        return this.bookmarkService.unfollow(channel).catch(error => {

            console.log(error);
        });
    }
}
