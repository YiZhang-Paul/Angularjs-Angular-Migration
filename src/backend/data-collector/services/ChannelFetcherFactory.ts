import ProviderResolverFactory from '../../shared/services/ProviderResolverFactory';

import FetcherFactory from './FetcherFactory';
import IChannelFetcher from './IChannelFetcher.interface';
import IChannelFetcherFactory from './IChannelFetcherFactory.interface';
import MixerChannelFetcher from './MixerChannelFetcher';

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
