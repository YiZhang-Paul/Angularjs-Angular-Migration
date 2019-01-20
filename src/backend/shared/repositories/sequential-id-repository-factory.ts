import { Document, Model } from 'mongoose';

import IDocumentGenerator from './document-generator.interface';
import IRepositoryFactory from './repository-factory.interface';
import IRepository from './repository.interface';
import SequentialIdGenerator from './sequential-id-generator';
import UniqueIdDocumentGenerator from './unique-id-document-factory';

export default abstract class SequentialIdRepositoryFactory<T extends IRepository> implements IRepositoryFactory {

    protected createDocumentGenerator(model: Model<Document, {}>): IDocumentGenerator {

        const idGenerator = new SequentialIdGenerator(model);

        return new UniqueIdDocumentGenerator(idGenerator);
    }

    public abstract createRepository(): T;
}
