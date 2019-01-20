import IGameDataCollector from './game-data-collector.interface';

export default interface IGameDataCollectorFactory {

    createGameCollector(): Promise<IGameDataCollector>;
}
