export default interface IDataStore {

    set(key: string, data: any[]): Promise<any[]>;
    get(key: string): Promise<any[]>;
}
