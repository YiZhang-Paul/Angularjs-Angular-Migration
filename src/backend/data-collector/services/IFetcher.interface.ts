export default interface IFetcher {

    fetch(): Promise<any[]>;
    fetchById(id: number): Promise<any>;
}
