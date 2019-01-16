import { Document, Model } from 'mongoose';

import IDocumentFactory from './IDocumentFactory.interface';
import IRepository from './IRepository.interface';
import IRepositoryFactory from './IRepositoryFactory.interface';
import SequentialIdGenerator from './SequentialIdGenerator';
import UniqueIdDocumentFactory from './UniqueIdDocumentFactory';

export default abstract class SequentialIdRepositoryFactory<T extends IRepository> implements IRepositoryFactory {

    protected createDocumentFactory(model: Model<Document, {}>): IDocumentFactory {

        const idGenerator = new SequentialIdGenerator(model);

        return new UniqueIdDocumentFactory(idGenerator);
    }

    public abstract createRepository(): T;
}
