import { Document } from 'mongoose';

import IQueryOption from './query-option.interface';

export default interface IRepository {

    has<T = string>(id: T): Promise<boolean>;
    insert(data: any[]): Promise<Document[]>;
    insertOne(data: any): Promise<Document | null>;
    find(filter?: any, option?: IQueryOption): Promise<Document[]>;
    findOne(filter: any, option?: IQueryOption): Promise<Document | null>;
    findById<T = string>(id: T): Promise<Document | null>;
    update(data: any, filter?: any): Promise<Document[]>;
    updateOne(data: any, filter: any): Promise<Document | null>;
    delete(filter: any): Promise<number>;
    deleteOne(filter: any): Promise<boolean>;
}
