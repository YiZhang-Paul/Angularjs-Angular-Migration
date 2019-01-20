import IDataStorageManager from './IDataStorageManager.interface';
import IMemoryDataStore from './IMemoryDataStore.interface';
import IPersistentDataStore from './IPersistentDataStore.interface';

export default class GameDataStorageManager implements IDataStorageManager {

    private readonly _cacheKey = 'games';
    private _persistentStore: IPersistentDataStore;
    private _memoryStore: IMemoryDataStore;

    constructor(

        memoryStore: IMemoryDataStore,
        persistentStore: IPersistentDataStore

    ) {

        this._memoryStore = memoryStore;
        this._persistentStore = persistentStore;
    }

    public async addToPersistent(data: any[]): Promise<any[]> {

        return this._persistentStore.set(data);
    }

    public async addToMemory(data: any[], key?: string): Promise<any[]> {

        return this._memoryStore.set(data, key ? key : this._cacheKey);
    }

    public async getFromPersistent(): Promise<any[]> {

        return this._persistentStore.get();
    }

    public async getFromMemory(key?: string): Promise<any[]> {

        return this._memoryStore.get(key ? key : this._cacheKey);
    }
}
