export default interface IChannelDataCollector {

    collect(): Promise<void>;
    collectByGameId(id: number): Promise<any[]>;
}
