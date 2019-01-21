import IChannelFetcher from '../../../shared/services/data-fetcher/channel-fetcher/channel-fetcher.interface';
import DataFetcher from '../../../shared/services/data-fetcher/data-fetcher';

export default class MixerChannelFetcher extends DataFetcher implements IChannelFetcher {

    public async fetch(): Promise<any[]> {

        return this.fetchData('?order=viewersCurrent:DESC&limit=80');
    }

    public async fetchById(id: number): Promise<any[]> {

        return this.fetchData(`/${id}`);
    }

    public async fetchByGameId(id: number): Promise<any[]> {

        const filter = `?where=typeId:eq:${id}`;

        return this.fetchData(`${filter}&order=viewersCurrent:DESC`);
    }
}
