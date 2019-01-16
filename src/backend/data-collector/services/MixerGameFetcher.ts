import Fetcher from './Fetcher';
import IGameFetcher from './IGameFetcher.interface';

export default class MixerGameFetcher extends Fetcher implements IGameFetcher {

    protected _provider = 'mixer';
    protected _apiType = 'search_game_url';

    public async fetch(): Promise<any[]> {

        return this.fetchData('?order=viewersCurrent:DESC&limit=50');
    }
}
