import IDataStorageManagerFactory from '../data-storage-manager.factory.interface';
import IDataStorageManager from '../data-storage-manager.interface';
import GameRepositoryFactory from '../../../repositories/game-repository/game-repository.factory';
import MemoryDataStore from '../../data-store/memory-data-store/memory-data-store';
import PersistentDataStore from '../../data-store/persistent-data-store/persistent-data-store';

import GameDataStorageManager from './game-data-storage-manager';

export default class GameDataStorageManagerFactory implements IDataStorageManagerFactory<IDataStorageManager> {

    public createStorageManager(): IDataStorageManager {

        const repository = new GameRepositoryFactory().createRepository();
        const memoryStore = new MemoryDataStore();
        const persistentStore = new PersistentDataStore(repository);

        return new GameDataStorageManager(memoryStore, persistentStore);
    }
}
