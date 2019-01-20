import config = require('config');

import DataAdapter from '../data-adapter';

import IGameDataAdapter from './game-data-adapter.interface';
import IReducibleGameData from './reducible-game-data.interface';

type KeyMapping = { source: string; target: string };

export default class GameDataAdapter extends DataAdapter implements IGameDataAdapter {

    private getMappings(groups: string[]): KeyMapping[] {

        const mappings: KeyMapping[] = [];
        const rules = config.get<any>('data_mappings');

        for (const group of groups) {

            mappings.push(...rules[group]);
        }

        return mappings;
    }

    public convert(data: any): IReducibleGameData {

        const mappings = this.getMappings(['general', 'mixer']);

        return this.applyMappings(data, {}, mappings) as IReducibleGameData;
    }
}
