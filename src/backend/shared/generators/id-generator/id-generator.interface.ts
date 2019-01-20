import { Document, Model } from 'mongoose';

export default interface IIdGenerator {

    readonly key: string;
    readonly model: Model<Document, {}>;

    showNext(id: string): string;
    generate(): Promise<string>;
}
