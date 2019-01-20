import IFetcherFactory from './fetcher-factory.interface';
import IGameFetcher from './game-fetcher.interface';

export default interface IGameFetcherFactory extends IFetcherFactory<IGameFetcher> { }
