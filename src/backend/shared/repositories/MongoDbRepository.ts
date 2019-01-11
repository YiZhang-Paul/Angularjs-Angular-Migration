import { Document, Model } from 'mongoose';

import IDocumentFactory from './IDocumentFactory.interface';
import IQueryOption from './IQueryOption.interface';
import IRepository from './IRepository.interface';

export default abstract class MongoDbRepository implements IRepository {

    protected _model: Model<Document, {}>;
    protected _documentFactory: IDocumentFactory;

    constructor(model: Model<Document, {}>, documentFactory: IDocumentFactory) {

        this._model = model;
        this._documentFactory = documentFactory;
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
