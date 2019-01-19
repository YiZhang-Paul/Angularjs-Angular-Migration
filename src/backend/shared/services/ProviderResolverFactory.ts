import ChannelRepositoryFactory from '../repositories/ChannelRepositoryFactory';
import GameRepositoryFactory from '../repositories/GameRepositoryFactory';
import ProviderRepositoryFactory from '../repositories/ProviderRepositoryFactory';

import IProviderResolver from './IProviderResolver.interface';
import IProviderResolverFactory from './IProviderResolverFactory.interface';
import ProviderResolver from './ProviderResolver';

export default class ProviderResolverFactory implements IProviderResolverFactory {

    public createResolver(): IProviderResolver {

        return new ProviderResolver(

            new ProviderRepositoryFactory().createRepository(),
            new GameRepositoryFactory().createRepository(),
            new ChannelRepositoryFactory().createRepository()
        );
    }
}
