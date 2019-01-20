export default interface IProviderResolver {

    resolveId(name: string): Promise<number>;
    resolveApi(name: string, type: string): Promise<string | null>;
    resolveGameId(name: string, gameId: number): Promise<number>;
    resolveChannelId(id: number): Promise<number>;
}
