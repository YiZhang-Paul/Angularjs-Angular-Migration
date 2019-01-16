import http from 'axios';

import models from '../../shared/models';

import IGameFetcher from './IGameFetcher.interface';

export default class MixerGameFetcher implements IGameFetcher {

    public async fetch(): Promise<any[]> {
        // TODO: create repository
        const provider = await models.Provider.findOne({ name: 'mixer' });

        if (!provider) {

            return new Array<any>();
        }
        // TODO: refactor into repository method
        const api: string = provider.toObject()['urls']['search_game_url'];

        try {

            const response = await http.get(`${api}?order=viewersCurrent:DESC&limit=50`);

            return response.data;

        } catch (error) {

            return new Array<any>();
        }
    }
}
