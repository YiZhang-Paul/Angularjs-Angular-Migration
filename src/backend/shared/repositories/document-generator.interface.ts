import { Document, Model } from 'mongoose';

export default interface IDocumentGenerator {

    readonly model: Model<Document, {}>;

    createDocument(data: any): Promise<Document>;
    createDocuments(data: any[]): Promise<Document[]>;
}
