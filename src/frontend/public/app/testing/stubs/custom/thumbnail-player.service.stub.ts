import { stub } from 'sinon';

import { ThumbnailPlayerService } from '../../../core/services/utilities/thumbnail-player/thumbnail-player.service';

export function stubThumbnailPlayerService() {

    const stubbed = {} as ThumbnailPlayerService;

    stubbed.play = stub();
    stubbed.stop = stub();

    return stubbed;
}
