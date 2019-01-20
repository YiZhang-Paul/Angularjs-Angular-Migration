import IRepository from './repository.interface';

export default interface IRepositoryFactory {

    createRepository(): IRepository;
}
