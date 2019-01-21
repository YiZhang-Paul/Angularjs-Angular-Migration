import config = require('config');

import DataAdapter from '../data-adapter';

import IGameDataAdapter from './game-data-adapter.interface';
import IReducibleGameData from './reducible-game-data.interface';

export default class GameDataAdapter extends DataAdapter<IReducibleGameData> implements IGameDataAdapter {

    constructor() {

        super(config.get<any>('data_mappings').games);
    }
}
