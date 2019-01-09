import { Document, Model } from 'mongoose';
import IQueryOption from './IQueryOption.interface';
import IRepository from './IRepository.interface';

export default abstract class MongoDbRepository implements IRepository {

    protected _model: Model<Document, {}>;

    constructor(model: Model<Document, {}>) {

        this._model = model;
    }

    protected toDocument(data: any): Document {

        return new this._model(data);
    }

    public insert(data: any[]): Promise<Document[]> {

        throw new Error('not supported');
    }

    public insertOne(data: any): Promise<Document> {

        throw new Error('not supported');
    }

    public find(filter?: any, option?: IQueryOption): Promise<Document[]> {

        throw new Error('not supported');
    }

    public findOne(filter: any, option?: IQueryOption): Promise<Document> {

        throw new Error('not supported');
    }

    public update(data: any, filter?: any): Promise<Document[]> {

        throw new Error('not supported');
    }

    public updateOne(data: any, filter: any): Promise<Document> {

        throw new Error('not supported');
    }

    public delete(filter: any): Promise<number> {

        throw new Error('not supported');
    }

    public deleteOne(filter: any): Promise<number> {

        throw new Error('not supported');
    }
}
