import config = require('config');

import DataAdapter from '../../shared/services/data-adapter/data-adapter';

import IReducibleGameDataAdapter from './reducible-game-data-adapter.interface';
import IReducibleGameData from './reducible-game-data.interface';

type KeyMapping = { source: string; target: string };

export default class GameDataAdapter extends DataAdapter implements IReducibleGameDataAdapter {

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
