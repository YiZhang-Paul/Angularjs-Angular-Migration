import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { GameModule } from '../game.module';

import { GameCardComponent } from './game-card.component';

context('game card component unit test', () => {

    let fixture: ComponentFixture<GameCardComponent>;
    let component: GameCardComponent;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [GameModule]
        });

        fixture = TestBed.createComponent(GameCardComponent);
        component = fixture.componentInstance;
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(GameCardComponent);
    });
});
