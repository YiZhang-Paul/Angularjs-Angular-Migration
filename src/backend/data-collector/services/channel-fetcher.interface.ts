import IFetcher from './fetcher.interface';

export default interface IChannelFetcher extends IFetcher {

    fetchByGameId(id: number): Promise<any[]>;
}
