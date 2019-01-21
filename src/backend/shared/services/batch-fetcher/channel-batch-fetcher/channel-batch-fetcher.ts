import BatchFetcher from '../batch-fetcher';
import IChannelFetcher from '../../data-fetcher/channel-fetcher/channel-fetcher.interface';

export default class ChannelBatchFetcher extends BatchFetcher<IChannelFetcher> {

    public async batchFetchByGameId(id: number): Promise<any[]> {
        // TODO: extract ids and names into table in base class?
        const data: any[] = [];

        for (const fetcher of this._fetchers) {

            const provider = fetcher.name;
            const gameId = await this._resolver.resolveGameId(provider, id);

            data.push(...await fetcher.fetchByGameId(gameId));
        }

        return data;
    }
}
