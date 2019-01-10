import { Document, Model } from 'mongoose';

import IIdGenerator from './IIdGenerator.interface';

export default abstract class IdGenerator implements IIdGenerator {

    public readonly key = 'id';

    protected _model: Model<Document, {}>;

    constructor(model: Model<Document, {}>) {
        // TODO: create index here
        this._model = model;
    }

    protected async getCurrentId(): Promise<string> {

        const sortOption = { [this.key]: -1 };
        const query = this._model.find().sort(sortOption).limit(1);
        const document = (await query)[0];

        return document ? document[this.key] : '';
    }

    public abstract async generate(): Promise<string>;
}
