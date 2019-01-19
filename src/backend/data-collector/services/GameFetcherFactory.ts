import ProviderResolverFactory from '../../shared/services/ProviderResolverFactory';

import FetcherFactory from './FetcherFactory';
import IGameFetcher from './IGameFetcher.interface';
import MixerGameFetcher from './MixerGameFetcher';

export default class GameFetcherFactory extends FetcherFactory<IGameFetcher> {

    constructor() {

        super(new ProviderResolverFactory().createResolver());
    }

    public async createFetcher(provider: string): Promise<IGameFetcher> {

        const type = 'search_game_url';
        const providerDetail = await this.getProvider(provider, type);

        switch (provider.toLowerCase()) {

            case 'mixer' :

                return new MixerGameFetcher(providerDetail);

            default :

                throw new Error('Cannot Create Fetcher.');
        }
    }
}
