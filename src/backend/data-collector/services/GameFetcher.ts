import IProviderRepository from '../../shared/repositories/IProviderRepository.interface';

import Fetcher from './Fetcher';
import IGameFetcher from './IGameFetcher.interface';

export default abstract class GameFetcher extends Fetcher implements IGameFetcher {

    constructor(providerName: string, repository: IProviderRepository) {

        super(providerName, 'search_game_url', repository);
    }

    public abstract fetch(): Promise<any[]>;
}
