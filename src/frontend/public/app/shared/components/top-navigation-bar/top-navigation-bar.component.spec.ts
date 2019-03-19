import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { SharedModule } from '../../shared.module';
import { $mdPanel } from '../../../core/upgraded-providers/$mdPanel-provider/$mdPanel-provider';
import { $rootScope } from '../../../core/upgraded-providers/$rootScope-provider/$rootScope-provider';
import { Authenticator } from '../../../core/upgraded-providers/authenticator-provider/authenticator-provider';
import { CustomRoutingService } from '../../../core/upgraded-providers/custom-routing-provider/custom-routing-provider';
import { GameManager } from '../../../core/upgraded-providers/game-manager-provider/game-manager-provider';

import { TopNavigationBarComponent } from './top-navigation-bar.component';

context('top navigation bar component unit test', () => {

    let fixture: ComponentFixture<TopNavigationBarComponent>;
    let component: TopNavigationBarComponent;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [SharedModule],
            providers: [

                { provide: $mdPanel, useValue: {} },
                { provide: $rootScope, useValue: {} },
                { provide: Authenticator, useValue: {} },
                { provide: CustomRoutingService, useValue: {} },
                { provide: GameManager, useValue: {} }
            ]
        });

        fixture = TestBed.createComponent(TopNavigationBarComponent);
        component = fixture.componentInstance;
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(TopNavigationBarComponent);
    });
});
