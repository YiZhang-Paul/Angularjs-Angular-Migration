import IProviderResolver from './IProviderResolver.interface';

export default interface IProviderResolverFactory {

    createResolver(): IProviderResolver;
}
