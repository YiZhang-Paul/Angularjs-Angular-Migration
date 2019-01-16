import IRepository from './IRepository.interface';

export default interface IProviderRepository extends IRepository {

    findApi(name: string, type: string): Promise<string | null>;
}
