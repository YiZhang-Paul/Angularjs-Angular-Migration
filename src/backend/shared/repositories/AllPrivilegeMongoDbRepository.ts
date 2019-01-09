import { Document, DocumentQuery } from 'mongoose';
import IQueryOption from './IQueryOption.interface';
import MongoDbRepository from './MongoDbRepository';
// TODO: move this to somewhere else
type Query<T> = DocumentQuery<T, Document, {}>;

export default abstract class AllPrivilegeMongoDbRepository extends MongoDbRepository {

    public async insert(data: any[]): Promise<Document[]> {

        const inserted: Document[] = [];
        const documents = data.map(_ => this.toDocument(_));

        for (const document of documents) {

            const isInserted = !!await document.save().catch(() => false);

            if (isInserted) {

                inserted.push(document);
            }
        }

        return inserted;
    }

    public async insertOne(data: any): Promise<Document> {

        const inserted = await this.insert([data]);

        return inserted[0];
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

    public async findOne(filter: any = {}, option: IQueryOption = {}): Promise<Document> {

        let query = this._model.find(filter, option.projection).limit(1);

        if (option.select) {

            query = this.appendSelect<Document[]>(query, option.select);
        }

        return (await query)[0];
    }

    protected async updateWithResult(id: string, data: any): Promise<Document | null> {

        try {

            const filter = { '_id': id };
            const option = { new: true };

            return this._model.findOneAndUpdate(filter, data, option);

        } catch (error) {

            return null;
        }
    }

    public async update(data: any, filter: any = {}): Promise<Document[]> {

        const oldDocuments = await this.find(filter);
        const newDocuments: Document[] = [];

        for (const document of oldDocuments) {

            const updated = await this.updateWithResult(document._id, data);

            if (updated) {

                newDocuments.push(updated);
            }
        }

        return newDocuments;
    }

    public async updateOne(data: any, filter: any): Promise<Document> {

        const document = await this.findOne(filter);

        if (!document) {

            return new Array<Document>()[0];
        }

        const updated = await this.updateWithResult(document._id, data);

        return updated ? updated : <Document>{};
    }

    protected async deleteWithResult(document: Document): Promise<boolean> {

        try {

            await document.remove();

            return true;

        } catch (error) {

            return false;
        }
    }

    public async delete(filter: any): Promise<number> {

        let totalDeleted = 0;
        const documents = await this.find(filter);

        for (const document of documents) {

            const isDeleted = await this.deleteWithResult(document);
            totalDeleted += isDeleted ? 1 : 0;
        }

        return totalDeleted;
    }

    public async deleteOne(filter: any): Promise<number> {

        const document = await this.findOne(filter);

        if (!document) {

            return 0;
        }

        const isDeleted = await this.deleteWithResult(document);

        return isDeleted ? 1 : 0;
    }
}
