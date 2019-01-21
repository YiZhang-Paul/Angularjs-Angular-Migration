import ChannelBatchFetcher from '../../batch-fetcher/channel-batch-fetcher/channel-batch-fetcher';
import ChannelDataAdapter from '../../data-adapter/channel-data-adapter/channel-data-adapter';
import ChannelDataStorageManagerFactory from '../../data-storage-manager/channel-data-storage-manager/channel-data-storage-manager.factory';
import ChannelFetcherFactory from '../../data-fetcher/channel-fetcher/channel-fetcher.factory';
import IChannelFetcher from '../../data-fetcher/channel-fetcher/channel-fetcher.interface';
import DataCollectorFactory from '../data-collector.factory';
import IDataReducer from '../../data-reducer/data-reducer.interface';
import ProviderResolverFactory from '../../provider-resolver/provider-resolver.factory';

import ChannelDataCollector from './channel-data-collector';
import IChannelDataCollectorFactory from './channel-data-collector.factory.interface';
import IChannelDataCollector from './channel-data-collector.interface';

export class ChannelDataCollectorFactory extends DataCollectorFactory<IChannelFetcher> implements IChannelDataCollectorFactory {

    constructor() {

        super(

            new ChannelFetcherFactory(),
            new ProviderResolverFactory().createResolver(),
            // TODO: remove this dependency from factory?
            {} as IDataReducer,
            new ChannelDataStorageManagerFactory().createStorageManager()
        );
    }

    public async createChannelCollector(): Promise<IChannelDataCollector> {

        const adapter = new ChannelDataAdapter();
        const fetchers = await this.createFetchers();
        const batchFetcher = new ChannelBatchFetcher(fetchers, this._resolver);

        return new ChannelDataCollector(

            batchFetcher,
            adapter,
            this._storageManager
        );
    }
}

export default new ChannelDataCollectorFactory().createChannelCollector();
