import ChannelBatchFetcher from '../../batch-fetcher/channel-batch-fetcher/channel-batch-fetcher';
import ChannelDataAdapter from '../../data-adapter/channel-data-adapter/channel-data-adapter';
import ChannelFetcherFactory from '../../data-fetcher/channel-fetcher/channel-fetcher.factory';
import IChannelFetcher from '../../data-fetcher/channel-fetcher/channel-fetcher.interface';
import DataCollectorFactory from '../data-collector.factory';
import MemoryDataStore from '../../data-store/memory-data-store/memory-data-store';
import ProviderResolverFactory from '../../provider-resolver/provider-resolver.factory';

import ChannelDataCollector from './channel-data-collector';
import IChannelDataCollectorFactory from './channel-data-collector.factory.interface';
import IChannelDataCollector from './channel-data-collector.interface';

export class ChannelDataCollectorFactory extends DataCollectorFactory<IChannelFetcher> implements IChannelDataCollectorFactory {

    constructor() {

        super(

            new ChannelFetcherFactory(),
            new ProviderResolverFactory().createResolver()
        );
    }

    public async createChannelCollector(): Promise<IChannelDataCollector> {

        const fetchers = await this.createFetchers();

        return new ChannelDataCollector(

            new ChannelBatchFetcher(fetchers, this._resolver),
            new ChannelDataAdapter(),
            new MemoryDataStore()
        );
    }
}

export default new ChannelDataCollectorFactory().createChannelCollector();
