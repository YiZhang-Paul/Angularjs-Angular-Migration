import { Document, model, Schema } from 'mongoose';

import ITestModel from './test-model.interface';

const TestModelSchema = new Schema({

    id: { type: Number, min: 0, required: true, unique: true },
    field_1: { type: String, required: true },
    field_2: { type: String, default: 'field_2' },
    field_3: { type: String, default: 'field_3', select: false },
    field_4: { type: String, default: 'field_4', select: false }
});

TestModelSchema.statics.addDefault = async function (total: number): Promise<void> {

    let counter = 0;

    for (let i = 0; i < total; i++) {

        const data = { id: ++counter, field_1: 'field_1' };
        await new this(data).save();
    }
};

TestModelSchema.statics.clear = async function (): Promise<void> {

    await this.deleteMany({});
};

TestModelSchema.statics.total = async function (): Promise<number> {
    // convert Query<number> to Promise<number>
    return await this.countDocuments({});
};

export default model<Document, ITestModel>('TestModel', TestModelSchema);
