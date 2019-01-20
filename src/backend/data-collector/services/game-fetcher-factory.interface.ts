import IDataFetcherFactory from '../../shared/services/data-fetcher/data-fetcher.factory.interface';

import IGameFetcher from './game-fetcher.interface';

export default interface IGameFetcherFactory extends IDataFetcherFactory<IGameFetcher> { }
