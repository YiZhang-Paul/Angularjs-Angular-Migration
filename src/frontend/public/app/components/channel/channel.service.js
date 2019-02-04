export class ChannelService {

    constructor(bookmarkService, viewHistoryService) {
        'ngInject';
        this.bookmarkService = bookmarkService;
        this.historyService = viewHistoryService;
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
