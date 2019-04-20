import { ComponentFixture, TestBed } from '@angular/core/testing';
import { assert as sinonExpect } from 'sinon';
import { expect } from 'chai';

import { SharedModule } from '../../../shared/shared.module';
import { GameFinder } from '../../../core/services/searching/game-finder/game-finder.service';
import { stubGameFinder } from '../../../testing/stubs/custom/game-finder.service.stub';

import { SearchBoxComponent } from './search-box.component';

context('search box component unit test', () => {

    let fixture: ComponentFixture<SearchBoxComponent>;
    let component: SearchBoxComponent;

    let gameFinderStub: any;

    beforeEach('stubs setup', () => {

        gameFinderStub = stubGameFinder();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [SharedModule],
            providers: [{ provide: GameFinder, useValue: gameFinderStub }]
        });

        fixture = TestBed.createComponent(SearchBoxComponent);
        component = fixture.componentInstance;
        gameFinderStub = TestBed.get(GameFinder);
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(SearchBoxComponent);
    });

    describe('search()', () => {

        it('should emit search result', done => {

            const expectedKeyword = 'keyword_1';
            const expectedResult = { games: [{ id: 1 }, { id: 4 }, { id: 7 }] };
            gameFinderStub.findByName.returns(expectedResult.games);

            component.onSearch.subscribe(result => {

                expect(result).to.deep.equal(expectedResult);
                sinonExpect.calledOnce(gameFinderStub.findByName);
                sinonExpect.calledWith(gameFinderStub.findByName, expectedKeyword);
                done();
            });

            component.search(expectedKeyword);
        });
    });
});
