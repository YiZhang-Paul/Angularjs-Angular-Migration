import { Document, Model } from 'mongoose';

import IIdGenerator from './IIdGenerator.interface';

export default abstract class IdGenerator implements IIdGenerator {

    public readonly key = 'id';

    protected _model: Model<Document, {}>;

    constructor(model: Model<Document, {}>) {

        this._model = model;
        this.createIndex();
    }

    private createIndex(): void {

        this._model.ensureIndexes({ [this.key]: -1 });

        const isDebugMode = process.env.DEBUG;
        const hasListener = this._model.listeners('index').length > 0;

        if (isDebugMode && !hasListener) {

            this._model.on('index', _ => console.log(_ ? _ : 'created index.'));
        }
    }

    protected async getLatestId(): Promise<string> {

        const sortOption = { [this.key]: -1 };
        const query = this._model.find().sort(sortOption).limit(1);
        const document = (await query)[0];

        return document ? document[this.key] : '';
    }

    public abstract showNext(id: string): string;

    public abstract async generate(): Promise<string>;
}
