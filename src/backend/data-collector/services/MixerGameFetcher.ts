import Fetcher from './Fetcher';
import IGameFetcher from './IGameFetcher.interface';

export default class MixerGameFetcher extends Fetcher implements IGameFetcher {

    public async fetch(): Promise<any[]> {

        const api = await this.getApi('search_game_url');

        if (!api) {

            return new Array<any>();
        }

        return this.fetchData(`${api}?order=viewersCurrent:DESC&limit=50`);
    }
}
