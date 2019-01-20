export default interface IBatchFetcher {

    batchFetch(): Promise<any[]>;
    batchFetchById(id: number): Promise<any[]>;
}
