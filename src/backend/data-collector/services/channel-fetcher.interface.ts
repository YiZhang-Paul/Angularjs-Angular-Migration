import IDataFetcher from '../../shared/services/data-fetcher/data-fetcher.interface';

export default interface IChannelFetcher extends IDataFetcher {

    fetchByGameId(id: number): Promise<any[]>;
}
