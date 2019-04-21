import { ComponentFixture, TestBed } from '@angular/core/testing';
import { assert as sinonExpect } from 'sinon';
import { expect } from 'chai';

import { SharedModule } from '../../shared.module';
import { CustomRoutingService } from '../../../core/services/custom-routing/custom-routing.service';
import { stubCustomRoutingService } from '../../../testing/stubs/custom/custom-routing.service.stub';
import { GameFinder } from '../../../core/services/searching/game-finder/game-finder.service';
import { stubGameFinder } from '../../../testing/stubs/custom/game-finder.service.stub';

import { DropdownSearchBoxComponent } from './dropdown-search-box.component';

context('dropdown search box component unit test', () => {

    let fixture: ComponentFixture<DropdownSearchBoxComponent>;
    let component: DropdownSearchBoxComponent;

    let customRoutingStub: any;
    let gameFinderStub: any;

    beforeEach('stubs setup', () => {

        customRoutingStub = stubCustomRoutingService();
        gameFinderStub = stubGameFinder();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [SharedModule],
            providers: [

                { provide: CustomRoutingService, useValue: customRoutingStub },
                { provide: GameFinder, useValue: gameFinderStub }
            ]
        });

        fixture = TestBed.createComponent(DropdownSearchBoxComponent);
        component = fixture.componentInstance;
        customRoutingStub = TestBed.get(CustomRoutingService);
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(DropdownSearchBoxComponent);
    });

    describe('toChannelsView()', () => {

        it('should use custom routing service to navigate to game channel state', () => {

            const expected = 15;

            component.toChannelsView({ id: expected });

            sinonExpect.calledOnce(customRoutingStub.toChannelsView);
            sinonExpect.calledWith(customRoutingStub.toChannelsView, expected);
        });

        it('should clear search result on route change', () => {

            component.result = { games: [{ id: 1 }, { id: 2 }] };

            component.toChannelsView({ id: 1 });

            expect(component.result).to.be.null;
        });
    });
});
