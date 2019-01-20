import IDataFetcherFactory from '../../shared/services/data-fetcher/data-fetcher.factory.interface';

import IChannelFetcher from './channel-fetcher.interface';

export default interface IChannelFetcherFactory extends IDataFetcherFactory<IChannelFetcher> { }
