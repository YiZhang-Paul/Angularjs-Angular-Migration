export default interface IFetcher {

    readonly id: number;
    readonly name: string;
    readonly api: string;

    fetch(): Promise<any[]>;
    fetchById(id: number): Promise<any>;
}
