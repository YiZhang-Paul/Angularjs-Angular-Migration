import AppModule from './app.module';

const mockModule = angular.mock.module;

context('app route unit test', () => {

    let $state;
    let $location;
    let $rootScope;
    let $httpBackend;

    beforeEach(mockModule(AppModule));

    beforeEach('general test setup', inject($injector => {

        $state = $injector.get('$state');
        $location = $injector.get('$location');
        $rootScope = $injector.get('$rootScope');
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.whenGET(/.*/).respond(200);
    }));

    it('should turn on HTML5 mode', () => {

        expect($location.$$html5).to.be.true;
    });

    describe('/', () => {

        it('should redirect to game list state at /games url', () => {

            $location.url('/');
            $rootScope.$apply();

            expect($state.current.name).to.equal('index.gameList');
            expect($state.current.url).to.equal('^/games');
        });
    });

    describe('*', () => {

        it('should redirect to error state at /error url', () => {

            $location.url('/invalid-url');
            $httpBackend.flush();

            expect($state.current.name).to.equal('error');
            expect($state.current.url).to.equal('/error');
        });
    });

    describe('/bookmarks', () => {

        it('should navigate to bookmarks state at /bookmarks url', () => {

            $location.url('/bookmarks');
            $rootScope.$apply();

            expect($state.current.name).to.equal('index.bookmarks');
            expect($state.current.url).to.equal('^/bookmarks');
        });
    });

    describe('/featured', () => {

        it('should navigate to featured state at /featured url', () => {

            $location.url('/featured');
            $rootScope.$apply();

            expect($state.current.name).to.equal('index.featured');
            expect($state.current.url).to.equal('^/featured');
        });
    });

    describe('/games', () => {

        it('should navigate to game list state at /games url', () => {

            $location.url('/games');
            $rootScope.$apply();

            expect($state.current.name).to.equal('index.gameList');
            expect($state.current.url).to.equal('^/games');
        });
    });

    describe('/games/:name', () => {

        it('should navigate to channels state at /games/:name url', () => {

            $location.url('/games/random-game-name');
            $rootScope.$apply();

            expect($state.current.name).to.equal('index.channels');
            expect($state.current.url).to.equal('^/games/:name');
        });
    });

    describe('/histories', () => {

        it('should navigate to histories state at /histories url', () => {

            $location.url('/histories');
            $rootScope.$apply();

            expect($state.current.name).to.equal('index.histories');
            expect($state.current.url).to.equal('^/histories');
        });
    });
});
