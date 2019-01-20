import ProviderResolverFactory from '../../shared/services/provider-resolver-factory';

import IChannelFetcherFactory from './channel-fetcher-factory.interface';
import IChannelFetcher from './channel-fetcher.interface';
import FetcherFactory from './fetcher-factory';
import MixerChannelFetcher from './mixer-channel-fetcher';

export default class ChannelFetcherFactory extends FetcherFactory<IChannelFetcher> implements IChannelFetcherFactory {

    constructor() {

        super(new ProviderResolverFactory().createResolver());
    }

    public async createFetcher(provider: string): Promise<IChannelFetcher> {

        const type = 'search_channel_url';
        const providerDetail = await this.getProvider(provider, type);

        switch (provider.toLowerCase()) {

            case 'mixer' :

                return new MixerChannelFetcher(providerDetail);

            default :

                throw new Error('Cannot Create Fetcher.');
        }
    }
}
