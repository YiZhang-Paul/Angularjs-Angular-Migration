import { Document, Model } from 'mongoose';

import IdGenerator from './IdGenerator';

export default class SequentialIdGenerator extends IdGenerator {

    constructor(model: Model<Document, {}>) {

        super(model);
    }

    public async generate(): Promise<string> {

        const maxId = await this.getMaximumId();

        if (maxId.length === 0) {

            return '0';
        }

        return String(+maxId + 1);
    }
}
