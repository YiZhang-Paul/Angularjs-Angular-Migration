import IChannelFetcher from '../../../shared/services/data-fetcher/channel-fetcher/channel-fetcher.interface';
import DataFetcher from '../../../shared/services/data-fetcher/data-fetcher';

export default class MixerChannelFetcher extends DataFetcher implements IChannelFetcher {

    private attachThumbnail(data: any[]): any[] {

        return data.map(_ => {

            _.stream_thumbnail = `https://thumbs.mixer.com/channel/${_.id}.m4v`;

            return _;
        });
    }

    protected async fetchData(query: string): Promise<any[]> {

        const data = await super.fetchData(query);

        return this.attachThumbnail(data);
    }

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
