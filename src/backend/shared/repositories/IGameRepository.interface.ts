import { Document } from 'mongoose';

import IRepository from './IRepository.interface';

export default interface IGameRepository extends IRepository {

    findByName(name: string): Promise<Document | null>;
    findProvidersById(id: number): Promise<any[]>;
}
