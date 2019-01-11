import { Document, Model } from 'mongoose';

import IDocumentFactory from './IDocumentFactory.interface';
import IIdGenerator from './IIdGenerator.interface';

export default class UniqueIdDocumentFactory implements IDocumentFactory {

    private _model: Model<Document, {}>;
    private _generator: IIdGenerator;

    constructor(model: Model<Document, {}>, generator: IIdGenerator) {

        this._model = model;
        this._generator = generator;
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
            documents.push(new this._model(_));
        }

        return documents;
    }
}
