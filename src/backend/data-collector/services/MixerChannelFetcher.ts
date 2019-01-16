import Fetcher from './Fetcher';
import IChannelFetcher from './IChannelFetcher.interface';

export default class MixerChannelFetcher extends Fetcher implements IChannelFetcher {

    protected async getApi(): Promise<string | null> {

        return await super.getApi('search_channel_url');
    }

    public async fetch(): Promise<any[]> {

        const api = await this.getApi();

        if (!api) {

            return new Array<any>();
        }

        return this.fetchData(`${api}?order=viewersCurrent:DESC&limit=50`);
    }

    public async fetchByGameId(id: string): Promise<any> {

        const api = await this.getApi();

        if (!api) {

            return new Array<any>();
        }

        return this.fetchData(`${api}?where=typeId:eq:${id}&order=viewersCurrent:DESC`);
    }
}
