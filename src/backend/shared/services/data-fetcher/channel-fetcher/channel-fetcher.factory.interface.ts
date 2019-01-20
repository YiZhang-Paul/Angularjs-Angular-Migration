import IDataFetcherFactory from '../data-fetcher.factory.interface';

import IChannelFetcher from './channel-fetcher.interface';

export default interface IChannelFetcherFactory extends IDataFetcherFactory<IChannelFetcher> { }
