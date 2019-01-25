export default interface IChannelService {

    isValidChannel(providerId: number, gameId: number): Promise<boolean>;
    findOrCreateChannel(providerId: number, providerChannelId: number): Promise<any>;
}
