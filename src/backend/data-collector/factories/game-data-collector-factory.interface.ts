import IGameDataCollector from '../services/game-data-collector.interface';

export default interface IGameDataCollectorFactory {

    createGameCollector(): Promise<IGameDataCollector>;
}
