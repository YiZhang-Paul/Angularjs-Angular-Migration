import IDataFetcher from '../data-fetcher.interface';

export default interface IChannelFetcher extends IDataFetcher {

    fetchByGameId(id: number): Promise<any[]>;
}
