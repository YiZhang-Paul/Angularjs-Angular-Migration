import config = require('config');

import DataAdapter from '../data-adapter';

import IChannelDataAdapter from './channel-data-adapter.interface';
import IReducibleChannelData from './reducible-channel-data.interface';
// TODO: extract into interface
// TODO: simplify reducer?
type KeyMapping = { source: string; target: string; delimiter?: string };
// TODO: extract abstract base class
export default class ChannelDataAdapter extends DataAdapter implements IChannelDataAdapter {

    private getMappings(groups: string[]): KeyMapping[] {

        const mappings: KeyMapping[] = [];
        const rules = config.get<any>('data_mappings').channels;

        for (const group of groups) {

            mappings.push(...rules[group]);
        }

        return mappings;
    }

    public convert(data: any): IReducibleChannelData {

        const mappings = this.getMappings(['general', 'mixer']);

        return this.applyMappings(data, {}, mappings) as IReducibleChannelData;
    }
}
