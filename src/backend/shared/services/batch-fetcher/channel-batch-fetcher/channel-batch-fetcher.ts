import BatchFetcher from '../batch-fetcher';
import IChannelFetcher from '../../data-fetcher/channel-fetcher/channel-fetcher.interface';

export default class ChannelBatchFetcher extends BatchFetcher<IChannelFetcher> {

    public async batchFetchByGameId(id: number): Promise<any[]> {

        await this.updateResolvedIds(id);

        const data: any[] = [];

        for (const fetcher of this._fetchers) {

            const resolved = this.getResolvedId(fetcher, id);

            if (resolved) {

                data.push(...await fetcher.fetchByGameId(resolved));
            }
        }

        return data;
    }
}
