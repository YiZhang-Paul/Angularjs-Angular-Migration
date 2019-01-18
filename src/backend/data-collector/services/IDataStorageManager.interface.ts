export default interface IDataStorageManager {

    addToPersistent(data: any[]): Promise<any[]>;
    addToMemory(data: any[]): Promise<any[]>;
    getFromPersistent(): Promise<any[]>;
    getFromMemory(): Promise<any[]>;
}
