export default interface IIdGenerator {

    readonly key: string;

    showNext(id: string): string;
    generate(): Promise<string>;
}
