import ChannelRepositoryFactory from '../../repositories/channel-repository/channel-repository.factory';
import GameRepositoryFactory from '../../repositories/game-repository/game-repository.factory';
import ProviderRepositoryFactory from '../../repositories/provider-repository/provider-repository.factory';

import ProviderResolver from './provider-resolver';
import IProviderResolverFactory from './provider-resolver.factory.interface';
import IProviderResolver from './provider-resolver.interface';

export default class ProviderResolverFactory implements IProviderResolverFactory {

    public createResolver(): IProviderResolver {

        return new ProviderResolver(

            new ProviderRepositoryFactory().createRepository(),
            new GameRepositoryFactory().createRepository(),
            new ChannelRepositoryFactory().createRepository()
        );
    }
}
