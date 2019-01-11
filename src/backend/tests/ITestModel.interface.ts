import { Document, Model } from 'mongoose';

export default interface ITestModel extends Model<Document> {

    addDefault(total: number): Promise<void>;
    clear(): Promise<void>;
    total(): Promise<number>;
}
