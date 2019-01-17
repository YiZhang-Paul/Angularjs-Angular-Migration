import { Document } from 'mongoose';

import IRepository from './IRepository.interface';

export default interface IProviderRepository extends IRepository {

    findByName(name: string): Promise<Document | null>;
}
