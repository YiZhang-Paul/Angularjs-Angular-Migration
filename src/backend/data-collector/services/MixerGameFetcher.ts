import Fetcher from './Fetcher';
import IGameFetcher from './IGameFetcher.interface';

export default class MixerGameFetcher extends Fetcher implements IGameFetcher {

    public async fetch(): Promise<any[]> {

        return this.fetchData('?order=viewersCurrent:DESC&limit=50');
    }

    public async fetchById(id: number): Promise<any[]> {

        return this.fetchData(`/${id}`);
    }
}
