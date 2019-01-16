import Fetcher from './Fetcher';
import IChannelFetcher from './IChannelFetcher.interface';

export default class MixerChannelFetcher extends Fetcher implements IChannelFetcher {

    protected _provider = 'mixer';
    protected _apiType = 'search_channel_url';

    public async fetch(): Promise<any[]> {

        return this.fetchData('?order=viewersCurrent:DESC&limit=50');
    }

    public async fetchByGameId(id: string): Promise<any> {

        const query = `?where=typeId:eq:${id}&order=viewersCurrent:DESC`;

        return this.fetchData(query);
    }
}
