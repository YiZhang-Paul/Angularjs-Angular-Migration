import IDataStorageManagerFactory from '../data-storage-manager.factory.interface';
import IDataStorageManager from '../data-storage-manager.interface';
import GameRepositoryFactory from '../../../repositories/game-repository/game-repository.factory';
import KeyRemover from '../../key-remover/key-remover';
import MemoryDataStore from '../../data-store/memory-data-store/memory-data-store';
import PersistentDataStore from '../../data-store/persistent-data-store/persistent-data-store';

import GameDataStorageManager from './game-data-storage-manager';

export default class GameDataStorageManagerFactory implements IDataStorageManagerFactory<IDataStorageManager> {

    public createStorageManager(): IDataStorageManager {

        const memoryStore = new MemoryDataStore();
        const repository = new GameRepositoryFactory().createRepository();
        const remover = new KeyRemover();
        const persistentStore = new PersistentDataStore(repository, remover);

        return new GameDataStorageManager(memoryStore, persistentStore);
    }
}
