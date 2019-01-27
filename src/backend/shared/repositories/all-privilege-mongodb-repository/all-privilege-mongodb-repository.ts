import { Document, DocumentQuery } from 'mongoose';

import MongoDbRepository from '../mongodb-repository/mongodb-repository';
import IQueryOption from '../query-option.interface';

type Query<T> = DocumentQuery<T, Document, {}>;

export default class AllPrivilegeMongoDbRepository extends MongoDbRepository {

    public async has<T = string>(id: T): Promise<boolean> {

        const document = await this.findById(id);

        return !!document;
    }

    public async insert(data: any[]): Promise<Document[]> {

        const documents = this._documentGenerator.createDocuments(data);
        const result: Document[] = [];

        for (const document of await documents) {

            const inserted = await document.save().catch(() => null);

            if (inserted) {

                result.push(inserted);
            }
        }

        return result;
    }

    public async insertOne(data: any): Promise<Document | null> {

        const inserted = await this.insert([data]);

        return inserted.length ? inserted[0] : null;
    }

    protected appendSelect<T>(query: Query<T>, select: string[]): Query<T> {

        select.forEach(field => {
            // must prepend '+' for selected fields
            query = query.select(`+${field.replace(/^\+/, '')}`);
        });

        return query;
    }

    public async find(filter: any = {}, option: IQueryOption = {}): Promise<Document[]> {

        const query = this._model.find(filter, option.projection);

        if (option.select) {

            return this.appendSelect<Document[]>(query, option.select);
        }

        return query;
    }

    public async findOne(filter: any = {}, option: IQueryOption = {}): Promise<Document | null> {

        let query = this._model.findOne(filter, option.projection);

        if (option.select) {

            query = this.appendSelect<Document | null>(query, option.select);
        }

        return query;
    }

    public async findById<T = string>(id: T): Promise<Document | null> {

        return this.findOne({ id });
    }

    protected async updateWithResult(id: string, data: any): Promise<Document | null> {

        try {

            const filter = { '_id': id };
            const option = { new: true };

            return await this._model.findOneAndUpdate(filter, data, option);

        }
        catch (error) {

            return null;
        }
    }

    public async update(data: any, filter: any = {}): Promise<Document[]> {

        const documents = await this.find(filter);
        const result: Document[] = [];

        for (const document of documents) {

            const updated = await this.updateWithResult(document._id, data);

            if (updated) {

                result.push(updated);
            }
        }

        return result;
    }

    public async updateOne(data: any, filter: any): Promise<Document | null> {

        const document = await this.findOne(filter);

        if (!document) {

            return null;
        }

        const updated = await this.updateWithResult(document._id, data);

        return updated ? updated : null;
    }

    protected async deleteWithResult(document: Document): Promise<boolean> {

        try {

            await document.remove();

            return true;

        }
        catch (error) {

            return false;
        }
    }

    public async delete(filter: any): Promise<number> {

        let result = 0;
        const documents = await this.find(filter);

        for (const document of documents) {

            const isDeleted = await this.deleteWithResult(document);
            result += isDeleted ? 1 : 0;
        }

        return result;
    }

    public async deleteOne(filter: any): Promise<boolean> {

        const document = await this.findOne(filter);

        return document ? await this.deleteWithResult(document) : false;
    }
}
