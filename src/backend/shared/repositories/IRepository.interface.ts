import { Document } from 'mongoose';
import IQueryOption from './IQueryOption.interface';

export default interface IRepository {

    insert(data: any[]): Promise<Document[]>;
    insertOne(data: any): Promise<Document>;
    find(filter?: any, option?: IQueryOption): Promise<Document[]>;
    findOne(filter: any, option?: IQueryOption): Promise<Document>;
    update(data: any, filter?: any): Promise<Document[]>;
    updateOne(data: any, filter: any): Promise<Document>;
    delete(filter: any): Promise<number>;
    deleteOne(filter: any): Promise<number>;
}
