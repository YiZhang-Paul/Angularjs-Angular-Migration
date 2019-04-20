import { stub } from 'sinon';

import { ChannelService } from '../../../features/channel/channel.service';

export function stubChannelService() {

    const stubbed = {} as ChannelService;

    stubbed.refreshChannels = stub();
    stubbed.loadFeaturedChannels = stub().resolves({});
    stubbed.loadGameChannels = stub().resolves({});

    return stubbed;
}
