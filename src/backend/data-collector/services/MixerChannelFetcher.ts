import Fetcher from './Fetcher';
import IChannelFetcher from './IChannelFetcher.interface';

export default class MixerChannelFetcher extends Fetcher implements IChannelFetcher {

    public async fetch(): Promise<any[]> {

        return this.fetchData('?order=viewersCurrent:DESC&limit=50');
    }

    public async fetchById(id: number): Promise<any[]> {

        return this.fetchData(`/${id}`);
    }

    public async fetchByGameId(id: number): Promise<any[]> {

        const filter = `?where=typeId:eq:${id}`;

        return this.fetchData(`${filter}&order=viewersCurrent:DESC`);
    }
}
