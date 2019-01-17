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

    constructor(fetchers: IGameFetcher[], reducer: IDataReducer) {

        this._fetchers = fetchers;
        this._reducer = reducer;
    }

    protected async fetchGames(): Promise<any[]> {

        const games: any[] = [];

        for (const fetcher of this._fetchers) {

            games.push(...await fetcher.fetch());
        }

        return games;
    }

    public async collect(): Promise<void> {

        const games = await this.fetchGames();
        const reducedGames = this._reducer.reduce(games);

        console.log(games[0]);
        console.log(reducedGames[0]);
    }
}
// TODO: wrap in factory class
const repository = new ProviderRepositoryFactory().createRepository();
const mixerFetcher = new MixerGameFetcher(repository);
const adapter = new GameDataAdapter();
const reducer = new GameDataReducer(adapter);

export default new GameDataCollector([mixerFetcher], reducer);
