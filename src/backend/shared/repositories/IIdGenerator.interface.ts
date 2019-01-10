export default interface IIdGenerator {

    readonly key: string;

    generate(): Promise<string>;
}
