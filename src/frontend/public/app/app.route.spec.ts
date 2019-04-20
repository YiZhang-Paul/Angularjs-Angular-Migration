import { TestBed } from '@angular/core/testing';
import { StateService } from '@uirouter/angular';
import { expect } from 'chai';

import { AppModule } from './app.module';

context('app route integration test', () => {

    let state;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [AppModule]
        });

        state = TestBed.get(StateService);
    });

    describe('/', () => {

        it('should redirect to game state at /games url', async () => {

            await state.go('game');

            expect(state.current.name).to.equal('game');
            expect(state.current.url).to.equal('^/games');
        });
    });

    describe('*', () => {

        it('should redirect to error state at /error url', async () => {

            await state.go('error');

            expect(state.current.name).to.equal('error');
            expect(state.current.url).to.equal('/error');
        });
    });

    describe('/bookmarks', () => {

        it('should navigate to bookmarks state at /bookmarks url', async () => {

            await state.go('bookmarks');

            expect(state.current.name).to.equal('bookmarks');
            expect(state.current.url).to.equal('^/bookmarks');
        });
    });

    describe('/featured', () => {

        it('should navigate to featured state at /featured url', async () => {

            await state.go('featured');

            expect(state.current.name).to.equal('featured');
            expect(state.current.url).to.equal('^/featured');
        });
    });

    describe('/games', () => {

        it('should navigate to game state at /games url', async () => {

            await state.go('game');

            expect(state.current.name).to.equal('game');
            expect(state.current.url).to.equal('^/games');
        });
    });

    describe('/games/:name', () => {

        it('should navigate to channels state at /games/:name url', async () => {

            await state.go('channels', { name: 'game-name' });

            expect(state.current.name).to.equal('channels');
            expect(state.current.url).to.equal('^/games/:name');
        });
    });

    describe('/histories', () => {

        it('should navigate to histories state at /histories url', async () => {

            await state.go('histories');

            expect(state.current.name).to.equal('histories');
            expect(state.current.url).to.equal('^/histories');
        });
    });
});
