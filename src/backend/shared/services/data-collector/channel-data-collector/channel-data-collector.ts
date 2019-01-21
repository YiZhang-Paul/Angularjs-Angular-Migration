import IBatchFetcher from '../../batch-fetcher/batch-fetcher.interface';
import IDataAdapter from '../../data-adapter/data-adapter.interface';
import IDataStorageManager from '../../data-storage-manager/data-storage-manager.interface';

import IChannelDataCollector from './channel-data-collector.interface';

export default class ChannelDataCollector implements IChannelDataCollector {

    private _fetcher: IBatchFetcher;
    private _adapter: IDataAdapter;
    private _storageManager: IDataStorageManager;

    constructor(

        fetcher: IBatchFetcher,
        adapter: IDataAdapter,
        storageManager: IDataStorageManager

    ) {

        this._fetcher = fetcher;
        this._adapter = adapter;
        this._storageManager = storageManager;
    }

    private sortByViews(data: any[], key: string): any[] {

        return data.slice().sort((a, b) => +b[key] - +a[key]);
    }

    private async addToStorage(data: any[], key?: string): Promise<void> {

        await this._storageManager.addToMemory(data, key);

        console.log(data);
        console.log(`channels: ${data.length}`);
    }

    public async collectByGameId(id: number): Promise<void> {

        const data = await this._fetcher.batchFetchByGameId(id);
        const adapted = data.map(_ => this._adapter.convert(_));
        const sorted = this.sortByViews(adapted, 'view_count');

        await this.addToStorage(sorted, `games/${id}/channels`);
    }
}
