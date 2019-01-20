import DataFetcherFactory from '../data-fetcher.factory';
import MixerChannelFetcher from '../../../../data-collector/services/mixer-channel-fetcher/mixer-channel-fetcher';
import ProviderResolverFactory from '../../provider-resolver/provider-resolver.factory';

import IChannelFetcherFactory from './channel-fetcher.factory.interface';
import IChannelFetcher from './channel-fetcher.interface';

export default class ChannelFetcherFactory extends DataFetcherFactory<IChannelFetcher> implements IChannelFetcherFactory {

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
