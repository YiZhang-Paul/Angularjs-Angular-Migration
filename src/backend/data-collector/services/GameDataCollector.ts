import GameRepositoryFactory from '../../shared/repositories/GameRepositoryFactory';
import IGameRepository from '../../shared/repositories/IGameRepository.interface';
import ProviderRepositoryFactory from '../../shared/repositories/ProviderRepositoryFactory';

import GameDataAdapter from './GameDataAdapter';
import GameDataReducer from './GameDataReducer';
import ICollector from './ICollector.interface';
import IDataReducer from './IDataReducer.interface';
import IGameFetcher from './IGameFetcher.interface';
import MixerGameFetcher from './MixerGameFetcher';

export class GameDataCollector implements ICollector {

    private _fetchers: IGameFetcher[];
    private _reducer: IDataReducer;
    private _repository: IGameRepository;

    constructor(fetchers: IGameFetcher[], reducer: IDataReducer, repository: IGameRepository) {

        this._fetchers = fetchers;
        this._reducer = reducer;
        this._repository = repository;
    }

    protected async fetchGames(): Promise<any[]> {

        const games: any[] = [];

        for (const fetcher of this._fetchers) {

            games.push(...await fetcher.fetch());
        }

        return games;
    }

    private sortByViewCount(data: any[]): any[] {

        const key = 'view_count';

        return data.slice().sort((a, b) => +b[key] - +a[key]);
    }

    private async pushToPersistentStorage(data: any[]): Promise<any[]> {

        const pushed: any[] = [];

        for (const _ of data) {

            const game = await this._repository.findByName(_['name']);

            if (!game) {

                const result = await this._repository.insertOne(_);

                if (result) {

                    pushed.push(result);
                }

                continue;
            }

            const object = game.toObject();

            for (const provider of _['search_api_keys']) {

                if (object['search_api_keys'].every((p: any) => p.provider_id !== provider.provider_id)) {

                    object['search_api_keys'].push(provider);
                }
            }

            const result = await this._repository.updateOne(object, { name: object['name'] });

            if (result) {

                pushed.push(result);
            }
        }

        return pushed;
    }

    public async collect(): Promise<void> {

        const data = await this.fetchGames();
        const reducedData = this._reducer.reduce(data);
        const toCollect = this.sortByViewCount(reducedData).slice(0, 50);

        const collected = await this.pushToPersistentStorage(toCollect);

        console.log(collected.length);
        console.log(collected);
    }
}
// TODO: wrap in factory class
const providerRepository = new ProviderRepositoryFactory().createRepository();
const mixerFetcher = new MixerGameFetcher(providerRepository);
const adapter = new GameDataAdapter();
const reducer = new GameDataReducer(adapter);
const gameRepository = new GameRepositoryFactory().createRepository();

export default new GameDataCollector([mixerFetcher], reducer, gameRepository);
