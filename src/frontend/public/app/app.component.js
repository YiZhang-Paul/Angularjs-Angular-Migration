import '../style.css';

export class App {

    constructor(bookmarkService) {
        'ngInject';
        this.service = bookmarkService;
    }

    $onInit() {
        // TODO: need test
        this.service.cacheBookmarks();
    }
}

export const AppComponent = {

    templateUrl: 'app/app.html',
    controller: App
};
