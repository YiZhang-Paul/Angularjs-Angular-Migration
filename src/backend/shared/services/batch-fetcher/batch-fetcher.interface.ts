export default interface IBatchFetcher {

    batchFetch(): Promise<any[]>;
    batchFetchByGameId(id: number): Promise<any[]>;
}
