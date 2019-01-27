export default interface IChannelService {

    getChannels(): Promise<any[]>;
    getChannelsByGameId(id: number): Promise<any[]>;
    isValidChannel(providerId: number, gameId: number): Promise<boolean>;
    findOrCreateChannel(providerId: number, providerChannelId: number): Promise<any>;
}
