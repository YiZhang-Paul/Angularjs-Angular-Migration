import { Document } from 'mongoose';

import IRepository from '../repository.interface';

export default interface IUserRepository extends IRepository {

    findByAccountId(id: number): Promise<Document | null>;
}
