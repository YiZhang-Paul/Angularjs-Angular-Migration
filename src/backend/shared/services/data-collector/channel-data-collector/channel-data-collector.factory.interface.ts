import IChannelDataCollector from './channel-data-collector.interface';

export default interface IChannelDataCollectorFactory {

    createChannelCollector(): Promise<IChannelDataCollector>;
}
