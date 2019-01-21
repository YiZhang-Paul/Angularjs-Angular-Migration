import config = require('config');

import DataAdapter from '../data-adapter';

import IChannelDataAdapter from './channel-data-adapter.interface';
import IReducibleChannelData from './reducible-channel-data.interface';

export default class ChannelDataAdapter extends DataAdapter<IReducibleChannelData> implements IChannelDataAdapter {

    constructor() {

        super(config.get<any>('data_mappings').channels);
    }
}
