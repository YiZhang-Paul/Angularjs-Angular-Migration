export default interface IChannelDataCollector {

    collectByGameId(id: number): Promise<void>;
}
