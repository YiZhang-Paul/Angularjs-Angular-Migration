import AppModule from './app.module.ajs';

const module = angular.mock.module;

context('app route unit test', () => {

    let $state;
    let $location;
    let $rootScope;

    beforeEach(module(AppModule));
    beforeEach(module('component-templates'));

    beforeEach('general test setup', inject($injector => {

        $state = $injector.get('$state');
        $location = $injector.get('$location');
        $rootScope = $injector.get('$rootScope');
    }));

    it('should turn on HTML5 mode', () => {

        expect($location.$$html5).to.be.true;
    });

    describe('/', () => {

        it('should redirect to game state at /games url', () => {

            $state.go('index');
            $rootScope.$apply();

            expect($state.current.name).to.equal('index.game');
            expect($state.current.url).to.equal('^/games');
        });
    });

    describe('*', () => {

        it('should redirect to error state at /error url', () => {

            $state.go('error');
            $rootScope.$apply();

            expect($state.current.url).to.equal('/error');
        });
    });

    describe('/bookmarks', () => {

        it('should navigate to bookmarks state at /bookmarks url', () => {

            $state.go('index.bookmarks');
            $rootScope.$apply();

            expect($state.current.url).to.equal('^/bookmarks');
        });
    });

    describe('/featured', () => {

        it('should navigate to featured state at /featured url', () => {

            $state.go('index.featured');
            $rootScope.$apply();

            expect($state.current.url).to.equal('^/featured');
        });
    });

    describe('/games', () => {

        it('should navigate to game state at /games url', () => {

            $state.go('index.game');
            $rootScope.$apply();

            expect($state.current.url).to.equal('^/games');
        });
    });

    describe('/games/:name', () => {

        it('should navigate to channels state at /games/:name url', () => {

            $state.go('index.channels', { name: 'some-game-name' });
            $rootScope.$apply();

            expect($state.current.url).to.equal('^/games/:name');
        });
    });

    describe('/histories', () => {

        it('should navigate to histories state at /histories url', () => {

            $state.go('index.histories');
            $rootScope.$apply();

            expect($state.current.url).to.equal('^/histories');
        });
    });
});
