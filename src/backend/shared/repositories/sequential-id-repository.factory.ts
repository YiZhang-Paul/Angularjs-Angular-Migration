import { Document, Model } from 'mongoose';

import IDocumentGenerator from '../generators/document-generator/document-generator.interface';
import SequentialIdGenerator from '../generators/id-generator/sequential-id-generator/sequential-id-generator';
import UniqueIdDocumentGenerator from '../generators/document-generator/unique-id-document-generator/unique-id-document-generator';

import IRepositoryFactory from './repository.factory.interface';
import IRepository from './repository.interface';

export default abstract class SequentialIdRepositoryFactory<T extends IRepository> implements IRepositoryFactory {

    protected createDocumentGenerator(model: Model<Document, {}>): IDocumentGenerator {

        const idGenerator = new SequentialIdGenerator(model);

        return new UniqueIdDocumentGenerator(idGenerator);
    }

    public abstract createRepository(): T;
}
