import IDataStorageManagerFactory from '../data-storage-manager.factory.interface';
import IDataStorageManager from '../data-storage-manager.interface';
import MemoryDataStore from '../../data-store/memory-data-store/memory-data-store';

import ChannelDataStorageManager from './channel-data-storage-manager';

export default class ChannelDataStorageManagerFactory implements IDataStorageManagerFactory<IDataStorageManager> {

    public createStorageManager(): IDataStorageManager {

        const memoryStore = new MemoryDataStore();

        return new ChannelDataStorageManager(memoryStore);
    }
}
