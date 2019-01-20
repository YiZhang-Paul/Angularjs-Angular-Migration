import IDataStorageManager from './data-storage-manager.interface';

export default interface IDataStorageManagerFactory<T extends IDataStorageManager> {

    createStorageManager(): T;
}
