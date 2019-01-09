import { Document, Schema, model } from 'mongoose';
import ITestModel from './ITestModel.interface';

const schema = new Schema({

    id: { type: Number, required: true },
    field_1: { type: String, default: 'field_1' },
    field_2: { type: String, default: 'field_2' },
    field_3: { type: String, default: 'field_3', select: false },
    field_4: { type: String, default: 'field_4', select: false }
});

schema.statics.addDefault = async function(total: number): Promise<void> {

    for (let i = 0, counter = 0; i < total; i++) {

        await new this({ id: ++counter }).save();
    }
}

schema.statics.clear = async function(): Promise<void> {

    await this.deleteMany({});
}

schema.statics.total = async function(): Promise<number> {
    // convert Query<number> to Promise<number>
    return await this.countDocuments({});
}

export default model<Document, ITestModel>('TestModel', schema);
