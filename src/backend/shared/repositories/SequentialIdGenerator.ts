import { Document, Model } from 'mongoose';

import IdGenerator from './IdGenerator';

export default class SequentialIdGenerator extends IdGenerator {

    constructor(model: Model<Document, {}>) {

        super(model);
    }

    public async generate(): Promise<string> {

        const currentId = await this.getCurrentId();

        return currentId ? String(+currentId + 1) : '0';
    }
}
