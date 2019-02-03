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

    getFeaturedChannels() {

        return this.channelService.getChannels().catch(error => {

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
