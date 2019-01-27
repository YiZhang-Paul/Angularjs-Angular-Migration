import { Document, Model } from 'mongoose';

import IDocumentGenerator from '../../generators/document-generator/document-generator.interface';
import IQueryOption from '../query-option.interface';
import IRepository from '../repository.interface';

export default abstract class MongoDbRepository implements IRepository {

    protected _documentGenerator: IDocumentGenerator;
    protected _model: Model<Document, {}>;

    constructor(documentGenerator: IDocumentGenerator) {

        this._documentGenerator = documentGenerator;
        this._model = documentGenerator.model;
    }

    public has<T = string>(_id: T): Promise<boolean> {

        throw new Error('not supported');
    }

    public insert(_data: any[]): Promise<Document[]> {

        throw new Error('not supported');
    }

    public insertOne(_data: any): Promise<Document | null> {

        throw new Error('not supported');
    }

    public find(_filter?: any, _option?: IQueryOption): Promise<Document[]> {

        throw new Error('not supported');
    }

    public findOne(_filter: any, _option?: IQueryOption): Promise<Document | null> {

        throw new Error('not supported');
    }

    public findById<T = string>(_id: T): Promise<Document | null> {

        throw new Error('not supported');
    }

    public update(_data: any, _filter?: any): Promise<Document[]> {

        throw new Error('not supported');
    }

    public updateOne(_data: any, _filter: any): Promise<Document | null> {

        throw new Error('not supported');
    }

    public delete(_filter: any): Promise<number> {

        throw new Error('not supported');
    }

    public deleteOne(_filter: any): Promise<boolean> {

        throw new Error('not supported');
    }
}
