export default interface IDataStorageManager {

    addToPersistent(data: any[]): Promise<any[]>;
    addToMemory(data: any[], key?: string): Promise<any[]>;
    getFromPersistent(): Promise<any[]>;
    getFromMemory(key?: string): Promise<any[]>;
}
