import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { assert as sinonExpect } from 'sinon';

import { ChannelModule } from '../channel.module';
import { ThumbnailPlayer } from '../../../core/upgraded-providers/thumbnail-player-provider/thumbnail-player-provider';
import { stubThumbnailPlayerService } from '../../../testing/stubs/custom/thumbnail-player.service.stub';

import { ChannelCardComponent } from './channel-card.component';

context('channel card component unit test', () => {

    let fixture: ComponentFixture<ChannelCardComponent>;
    let component: ChannelCardComponent;

    let thumbnailPlayerStub;

    beforeEach('stubs setup', () => {

        thumbnailPlayerStub = stubThumbnailPlayerService();
    });

    beforeEach('general test setup', () => {

        TestBed.configureTestingModule({

            imports: [ChannelModule],
            providers: [{ provide: ThumbnailPlayer, useValue: thumbnailPlayerStub }]
        });

        fixture = TestBed.createComponent(ChannelCardComponent);
        component = fixture.componentInstance;
    });

    it('should resolve', () => {

        expect(component).is.not.null;
        expect(component).to.be.instanceOf(ChannelCardComponent);
    });

    describe('playThumbnail()', () => {

        it('should use thumbnail player service to play thumbnail', () => {

            const thumbnail = { srcElement: { currentTime: 55 } };

            component.playThumbnail(thumbnail);

            sinonExpect.calledOnce(thumbnailPlayerStub.play);
            sinonExpect.calledWith(thumbnailPlayerStub.play, thumbnail);
        });
    });

    describe('stopThumbnail()', () => {

        it('should use thumbnail player service to stop thumbnail', () => {

            const thumbnail = { srcElement: { currentTime: 55 } };

            component.stopThumbnail(thumbnail);

            sinonExpect.calledOnce(thumbnailPlayerStub.stop);
            sinonExpect.calledWith(thumbnailPlayerStub.stop, thumbnail);
        });
    });
});
