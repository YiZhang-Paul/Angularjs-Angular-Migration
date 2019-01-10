import { Document } from 'mongoose';
import IQueryOption from './IQueryOption.interface';

export default interface IRepository {

    insert(data: any[]): Promise<Document[]>;
    insertOne(data: any): Promise<Document | null>;
    find(filter?: any, option?: IQueryOption): Promise<Document[]>;
    findOne(filter: any, option?: IQueryOption): Promise<Document | null>;
    update(data: any, filter?: any): Promise<Document[]>;
    updateOne(data: any, filter: any): Promise<Document | null>;
    delete(filter: any): Promise<number>;
    deleteOne(filter: any): Promise<boolean>;
}
