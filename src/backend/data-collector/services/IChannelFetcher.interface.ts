import IFetcher from './IFetcher.interface';

export default interface IChannelFetcher extends IFetcher {

    fetchByGameId(id: number): Promise<any[]>;
}
