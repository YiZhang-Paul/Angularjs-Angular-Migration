import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { SharedModule } from '../../../shared/shared.module';

import { UserWidgetComponent } from './user-widget.component';

context('user widget component unit test', () => {

    let fixture: ComponentFixture<UserWidgetComponent>;
    let component: UserWidgetComponent;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [SharedModule]
        });

        fixture = TestBed.createComponent(UserWidgetComponent);
        component = fixture.componentInstance;
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(UserWidgetComponent);
    });

    describe('menu options', () => {

        it('should initialize options', () => {

            expect(component.statusOptions).is.not.empty;
            expect(component.channelOptions).is.not.empty;
            expect(component.userOptions).is.not.empty;
        });
    });

    describe('statusText', () => {

        it('should initialize status text', () => {

            expect(component.statusText).to.equal('Invisible');
        });

        it('should be one of the status options', () => {

            const options = component.statusOptions;

            expect(options.includes(component.statusText)).to.be.true;
        });
    });
});
