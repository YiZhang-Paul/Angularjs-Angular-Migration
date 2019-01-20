import DataFetcher from '../../../shared/services/data-fetcher/data-fetcher';
import IGameFetcher from '../../../shared/services/data-fetcher/game-fetcher/game-fetcher.interface';

export default class MixerGameFetcher extends DataFetcher implements IGameFetcher {

    public async fetch(): Promise<any[]> {

        return this.fetchData('?order=viewersCurrent:DESC&limit=50');
    }

    public async fetchById(id: number): Promise<any[]> {

        return this.fetchData(`/${id}`);
    }
}
