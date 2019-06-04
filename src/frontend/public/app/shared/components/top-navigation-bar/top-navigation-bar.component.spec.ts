import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { stubComponent } from '../../../testing/stubs/custom/component.stub';
import { CustomRoutingService } from '../../../core/services/custom-routing/custom-routing.service';

import { TopNavigationBarComponent } from './top-navigation-bar.component';

context('top navigation bar component unit test', () => {

    let fixture: ComponentFixture<TopNavigationBarComponent>;
    let component: TopNavigationBarComponent;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            declarations: [
                TopNavigationBarComponent,
                stubComponent({ selector: 'dropdown-search-box' }),
                stubComponent({ selector: 'user-login' })
            ],
            providers: [

                { provide: CustomRoutingService, useValue: {} }
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
