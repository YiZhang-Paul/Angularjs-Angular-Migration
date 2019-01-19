export default interface IGameDataCollector {

    collect(): Promise<void>;
    collectById(id: number): Promise<void>;
}
