import IDataStorageManager from '../data-storage-manager.interface';
import IMemoryDataStore from '../../data-store/memory-data-store/memory-data-store.interface';

export default class ChannelDataStorageManager implements IDataStorageManager {

    private readonly _cacheKey = 'channels';
    private _memoryStore: IMemoryDataStore;

    constructor(memoryStore: IMemoryDataStore) {

        this._memoryStore = memoryStore;
    }
    // TODO: redesign data store manager or break down interfaces
    public async addToPersistent(data: any[]): Promise<any[]> {

        return this.addToMemory(data);
    }

    public async addToMemory(data: any[], key?: string): Promise<any[]> {

        return this._memoryStore.set(data, key ? key : this._cacheKey);
    }

    public async getFromPersistent(): Promise<any[]> {

        return this.getFromMemory();
    }

    public async getFromMemory(key?: string): Promise<any[]> {

        return this._memoryStore.get(key ? key : this._cacheKey);
    }
}
