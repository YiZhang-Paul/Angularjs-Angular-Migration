import './channel-card.css';

export class ChannelCard {

    constructor(thumbnailPlayerService) {
        'ngInject';
        this.thumbnailPlayer = thumbnailPlayerService;
    }

    playThumbnail(thumbnail) {

        this.thumbnailPlayer.play(thumbnail);
    }

    stopThumbnail(thumbnail) {

        this.thumbnailPlayer.stop(thumbnail);
    }
}

export const ChannelCardComponent = {

    bindings: {

        channel: '<',
        isFollowed: '<',
        onFollow: '&',
        onUnfollow: '&'
    },
    templateUrl: 'app/components/channel/channel-card/channel-card.html',
    controller: ChannelCard
};
