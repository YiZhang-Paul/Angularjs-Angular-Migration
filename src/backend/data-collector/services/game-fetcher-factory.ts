import ProviderResolverFactory from '../../shared/services/provider-resolver/provider-resolver.factory';

import FetcherFactory from './fetcher-factory';
import IGameFetcherFactory from './game-fetcher-factory.interface';
import IGameFetcher from './game-fetcher.interface';
import MixerGameFetcher from './mixer-game-fetcher';

export default class GameFetcherFactory extends FetcherFactory<IGameFetcher> implements IGameFetcherFactory {

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
