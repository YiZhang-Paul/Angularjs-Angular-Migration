export class SidebarService {

    constructor(bookmarkHttpService, viewHistoryHttpService) {
        'ngInject';
        this.bookmarkService = bookmarkHttpService;
        this.historyService = viewHistoryHttpService;
    }

    getBookmarks() {

        return this.bookmarkService.getBookmarks().catch(error => {

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
