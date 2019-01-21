export default interface IDataStore {

    set(data: any[], key?: string, expire?: number): Promise<any[]>;
    get(key?: string): Promise<any[]>;
}
