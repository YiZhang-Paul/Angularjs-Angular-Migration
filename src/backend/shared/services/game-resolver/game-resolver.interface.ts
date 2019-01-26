export default interface IGameResolver {

    resolveByChannel(channel: any): Promise<any>;
}
