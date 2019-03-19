import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';

import { BookmarkModule } from '../bookmark.module';

import { BookmarkCardComponent } from './bookmark-card.component';

context('bookmark card component unit test', () => {

    let fixture: ComponentFixture<BookmarkCardComponent>;
    let component: BookmarkCardComponent;

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [BookmarkModule]
        });

        fixture = TestBed.createComponent(BookmarkCardComponent);
        component = fixture.componentInstance;
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(BookmarkCardComponent);
    });
});
