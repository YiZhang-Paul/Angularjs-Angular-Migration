import AppModule from './app.module';

const mockModule = angular.mock.module;

context('app route unit test', () => {

    let $state;
    let $location;
    let $httpBackend;

    beforeEach(mockModule(AppModule));

    beforeEach('general test setup', inject($injector => {

        $state = $injector.get('$state');
        $location = $injector.get('$location');
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.whenGET(/.*/).respond(200);
    }));

    it('should turn on HTML5 mode', () => {

        expect($location.$$html5).to.be.true;
    });

    describe('/', () => {

        it('should redirect to games state at /games url', () => {

            $location.url('/');
            $httpBackend.flush();

            expect($state.current.name).to.equal('games');
            expect($state.current.url).to.equal('/games');
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
            $httpBackend.flush();

            expect($state.current.name).to.equal('bookmarks');
            expect($state.current.url).to.equal('/bookmarks');
        });
    });

    describe('/featured', () => {

        it('should navigate to featured state at /featured url', () => {

            $location.url('/featured');
            $httpBackend.flush();

            expect($state.current.name).to.equal('featured');
            expect($state.current.url).to.equal('/featured');
        });
    });

    describe('/games', () => {

        it('should navigate to games state at /games url', () => {

            $location.url('/games');
            $httpBackend.flush();

            expect($state.current.name).to.equal('games');
            expect($state.current.url).to.equal('/games');
        });
    });

    describe('/games/:name', () => {

        it('should navigate to channels state at /games/:name url', () => {

            $location.url('/games/random-game-name');
            $httpBackend.flush();

            expect($state.current.name).to.equal('channels');
            expect($state.current.url).to.equal('/games/:name');
        });
    });

    describe('/histories', () => {

        it('should navigate to histories state at /histories url', () => {

            $location.url('/histories');
            $httpBackend.flush();

            expect($state.current.name).to.equal('histories');
            expect($state.current.url).to.equal('/histories');
        });
    });
});