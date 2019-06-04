import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { CapitalizePipe } from '../../../pipes/capitalize/capitalize.pipe';

import { GameBadgeComponent } from './game-badge.component';

context('game badge component unit test', () => {

    let fixture: ComponentFixture<GameBadgeComponent>;
    let component: GameBadgeComponent;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            declarations: [
                GameBadgeComponent,
                CapitalizePipe
            ]
        });

        fixture = TestBed.createComponent(GameBadgeComponent);
        component = fixture.componentInstance;
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(GameBadgeComponent);
    });
});
