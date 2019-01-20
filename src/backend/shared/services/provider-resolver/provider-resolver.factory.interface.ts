import IProviderResolver from './provider-resolver.interface';

export default interface IProviderResolverFactory {

    createResolver(): IProviderResolver;
}
