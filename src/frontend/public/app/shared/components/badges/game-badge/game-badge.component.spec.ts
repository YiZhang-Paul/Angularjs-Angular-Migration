import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { SharedModule } from '../../../shared.module';

import { GameBadgeComponent } from './game-badge.component';

context('game badge component unit test', () => {

    let fixture: ComponentFixture<GameBadgeComponent>;
    let component: GameBadgeComponent;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [SharedModule]
        });

        fixture = TestBed.createComponent(GameBadgeComponent);
        component = fixture.componentInstance;
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(GameBadgeComponent);
    });
});
