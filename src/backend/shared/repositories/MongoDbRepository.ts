import { Document, Model } from 'mongoose';

import IIdGenerator from './IIdGenerator.interface';
import IQueryOption from './IQueryOption.interface';
import IRepository from './IRepository.interface';

export default abstract class MongoDbRepository implements IRepository {

    protected _model: Model<Document, {}>;
    protected _generator: IIdGenerator;

    constructor(model: Model<Document, {}>, generator: IIdGenerator) {

        this._model = model;
        this._generator = generator;
    }

    protected async toDocument(data: any): Promise<Document> {

        const idField = this._generator.key;
        data[idField] = await this._generator.generate();

        return new this._model(data);
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
