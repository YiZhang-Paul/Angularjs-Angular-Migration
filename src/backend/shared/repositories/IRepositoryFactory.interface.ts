import IRepository from './IRepository.interface';

export default interface IRepositoryFactory {

    createRepository(): IRepository;
}
