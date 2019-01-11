import { Document } from 'mongoose';

export default interface IDocumentFactory {

    createDocument(data: any): Promise<Document>;
    createDocuments(data: any[]): Promise<Document[]>;
}
