import DataAdapter from './DataAdapter';
import IReducedGameData from './IReducedGameData.interface';
import IReducibleGameDataAdapter from './IReducibleGameDataAdapter.interface';

export default class GameDataAdapter extends DataAdapter implements IReducibleGameDataAdapter {

    private _generalMappings = [

        { from: 'provider_id', to: 'provider_id' }
    ];

    private _mixerMappings = [

        { from: 'name', to: 'name' },
        { from: 'id', to: 'provider_game_id' },
        { from: 'name', to: 'provider_game_name' },
        { from: 'coverUrl', to: 'image' },
        { from: 'viewersCurrent', to: 'view_count' }
    ];

    private _mappings = [

        ...this._generalMappings,
        ...this._mixerMappings
    ];

    public convert(data: any): IReducedGameData {

        return this.applyMappings(data, {}, this._mappings) as IReducedGameData;
    }
}
