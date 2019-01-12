import { Document, Model } from 'mongoose';

import IdGenerator from './IdGenerator';

export default class SequentialIdGenerator extends IdGenerator {

    constructor(model: Model<Document, {}>) {

        super(model);
    }

    public showNext(id: string): string {

        return `${+id + 1}`;
    }

    public async generate(): Promise<string> {

        const latestId = await this.getLatestId();

        return latestId ? this.showNext(latestId) : '0';
    }
}
