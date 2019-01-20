import IDataAdapter from '../data-adapter.interface';

import IReducibleGameData from './reducible-game-data.interface';

export default interface IGameDataAdapter extends IDataAdapter<IReducibleGameData> { }
