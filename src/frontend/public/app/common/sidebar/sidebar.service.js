export class SidebarService {

    constructor(bookmarkHttpService, channelHttpService, viewHistoryHttpService) {
        'ngInject';
        this.bookmarkService = bookmarkHttpService;
        this.channelService = channelHttpService;
        this.historyService = viewHistoryHttpService;
    }

    getBookmarks() {

        return this.bookmarkService.getBookmarks().catch(error => {

            console.log(error);

            return [];
        });
    }

    _addGameName(channels) {

        return channels.map(_ => {

            _.game_name = _.provider_game_name;

            return _;
        });
    }

    getFeaturedChannels() {

        return this.channelService.getChannels().then(channels => {

            return this._addGameName(channels);
        })
        .catch(error => {

            console.log(error);

            return [];
        });
    }

    getHistories() {

        return this.historyService.getHistories().catch(error => {

            console.log(error);

            return [];
        });
    }
}
