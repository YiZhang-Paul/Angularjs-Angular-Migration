export class ChannelService {

    constructor(bookmarkService) {
        'ngInject';
        this.bookmarkService = bookmarkService;
    }

    playThumbnail(video) {

        video.srcElement.play();
    }

    stopThumbnail(video) {

        video.srcElement.pause();
        video.srcElement.currentTime = 0;
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
