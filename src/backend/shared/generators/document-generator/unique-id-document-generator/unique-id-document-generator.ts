import { Document, Model } from 'mongoose';

import IDocumentGenerator from '../document-generator.interface';
import IIdGenerator from '../../id-generator/id-generator.interface';

export default class UniqueIdDocumentGenerator implements IDocumentGenerator {

    private _generator: IIdGenerator;

    constructor(generator: IIdGenerator) {

        this._generator = generator;
    }

    get model(): Model<Document, {}> {

        return this._generator.model;
    }

    public async createDocument(data: any): Promise<Document> {

        const result = this.createDocuments([data]);

        return (await result)[0];
    }

    public async createDocuments(data: any[]): Promise<Document[]> {

        let id = await this._generator.generate();
        const documents: Document[] = [];

        for (const _ of data) {

            _[this._generator.key] = id;
            id = this._generator.showNext(id);
            documents.push(new this.model(_));
        }

        return documents;
    }
}
