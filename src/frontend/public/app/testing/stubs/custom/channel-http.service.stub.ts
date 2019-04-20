import { stub } from 'sinon';

import { ChannelHttpService } from '../../../core/services/http/channel-http/channel-http.service';

export function stubChannelHttpService() {

    const stubbed = {} as ChannelHttpService;

    stubbed.getChannels = stub().resolves([]);
    stubbed.getChannelsByGameId = stub().resolves([]);

    return stubbed;
}
