export class SidebarService {

    constructor(bookmarkHttpService, viewHistoryHttpService) {
        'ngInject';
        this.bookmarkService = bookmarkHttpService;
        this.historyService = viewHistoryHttpService;

        this.api = 'http://127.0.0.1:4150/api/v1/user';
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        this.defaultHeaders = { 'Authorization': `bearer ${this.token}` };
        this.defaultOptions = Object.freeze({ headers: this.defaultHeaders });
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
