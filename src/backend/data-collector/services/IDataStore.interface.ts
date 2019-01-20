export default interface IDataStore {

    set(data: any[], key?: string): Promise<any[]>;
    get(key?: string): Promise<any[]>;
}
