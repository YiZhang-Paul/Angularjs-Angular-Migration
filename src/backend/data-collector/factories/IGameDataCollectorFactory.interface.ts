import IGameDataCollector from '../services/IGameDataCollector.interface';

export default interface IGameDataCollectorFactory {

    createGameCollector(): Promise<IGameDataCollector>;
}
