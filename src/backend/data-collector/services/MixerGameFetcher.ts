import IProviderRepository from '../../shared/repositories/IProviderRepository.interface';

import GameFetcher from './GameFetcher';

export default class MixerGameFetcher extends GameFetcher {

    constructor(repository: IProviderRepository) {

        super('mixer', repository);
    }

    public async fetch(): Promise<any[]> {

        return this.fetchData('?order=viewersCurrent:DESC&limit=50');
    }
}
