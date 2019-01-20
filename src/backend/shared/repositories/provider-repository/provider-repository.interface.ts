import IRepository from '../repository.interface';

export default interface IProviderRepository extends IRepository {

    findIdByName(name: string): Promise<number>;
    findApisByName(name: string): Promise<any>;
}
