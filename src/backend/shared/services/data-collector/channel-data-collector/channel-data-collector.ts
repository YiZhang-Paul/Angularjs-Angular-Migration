import IBatchFetcher from '../../batch-fetcher/batch-fetcher.interface';
import IDataAdapter from '../../data-adapter/data-adapter.interface';
import IMemoryDataStore from '../../data-store/memory-data-store/memory-data-store.interface';

import IChannelDataCollector from './channel-data-collector.interface';

export default class ChannelDataCollector implements IChannelDataCollector {

    private _fetcher: IBatchFetcher;
    private _adapter: IDataAdapter;
    private _memoryStore: IMemoryDataStore;

    constructor(

        fetcher: IBatchFetcher,
        adapter: IDataAdapter,
        memoryStore: IMemoryDataStore

    ) {

        this._fetcher = fetcher;
        this._adapter = adapter;
        this._memoryStore = memoryStore;
    }

    private sortByViews(data: any[], key: string): any[] {

        return data.slice().sort((a, b) => +b[key] - +a[key]);
    }

    private async addToStorage(data: any[], key?: string): Promise<void> {

        await this._memoryStore.set(data, key, 30);
    }

    public async collect(): Promise<void> {

        const data = await this._fetcher.batchFetch();
        const adapted = data.map(_ => this._adapter.convert(_));
        const sorted = this.sortByViews(adapted, 'view_count');

        await this.addToStorage(sorted, 'channels');
    }

    public async collectByGameId(id: number): Promise<any[]> {

        const data = await this._fetcher.batchFetchByGameId(id);
        const adapted = data.map(_ => this._adapter.convert(_));
        const sorted = this.sortByViews(adapted, 'view_count');

        await this.addToStorage(sorted, `games/${id}/channels`);

        return sorted;
    }
}
