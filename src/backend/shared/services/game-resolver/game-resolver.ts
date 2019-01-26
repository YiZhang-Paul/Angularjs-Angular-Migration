import { Document } from 'mongoose';

import IGameRepository from '../../repositories/game-repository/game-repository.interface';

import IGameResolver from './game-resolver.interface';

export default class GameResolver implements IGameResolver {

    private _repository: IGameRepository;
    private _resolvedGames = new Map<string, any>();

    constructor(repository: IGameRepository) {

        this._repository = repository;
    }

    private setResolvedGame(key: string, game: Document | null): any {

        this._resolvedGames.set(key, game ? game.toObject() : null);

        return this._resolvedGames.get(key);
    }

    public async resolveByChannel(channel: any): Promise<any> {

        const key = `${channel.provider_id}<|>${channel.provider_game_id}`;
        const resolved = this._resolvedGames.get(key);

        if (resolved) {

            return resolved;
        }

        const filter = {

            'search_api_keys.provider_id': channel.provider_id,
            'search_api_keys.provider_game_id': channel.provider_game_id
        };

        const game = await this._repository.findOne(filter);

        return this.setResolvedGame(key, game);
    }
}
