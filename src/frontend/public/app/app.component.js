import '../style.scss';

export class App {

    constructor(bookmarkService) {
        'ngInject';
        this.service = bookmarkService;
    }

    $onInit() {
        // TODO: only when authenticated
        this.service.cacheBookmarks();
    }
}

export const AppComponent = {

    templateUrl: 'app/app.html',
    controller: App
};
