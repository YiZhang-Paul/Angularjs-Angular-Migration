import Fetcher from './Fetcher';
import IGameFetcher from './IGameFetcher.interface';

export default class MixerGameFetcher extends Fetcher implements IGameFetcher {

    protected async getApi(): Promise<string | null> {

        return await super.getApi('mixer', 'search_game_url');
    }

    public async fetch(): Promise<any[]> {

        const api = await this.getApi();

        if (!api) {

            return new Array<any>();
        }

        return this.fetchData(`${api}?order=viewersCurrent:DESC&limit=50`);
    }
}
