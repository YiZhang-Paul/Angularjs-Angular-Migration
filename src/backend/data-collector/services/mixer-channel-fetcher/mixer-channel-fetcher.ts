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
        const data = await this.fetchData(`${filter}&order=viewersCurrent:DESC`);

        for (const _ of data) {

            _.thumbnail = `https://thumbs.mixer.com/channel/${_.id}.m4v`;
        }

        return data;
    }
}
