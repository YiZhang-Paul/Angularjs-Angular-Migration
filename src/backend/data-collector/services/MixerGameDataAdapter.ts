import DataAdapter from './DataAdapter';

export default class MixerGameDataAdapter extends DataAdapter {

    private mapSearchKeys(data: any): any {

        const mappings = [

            { from: 'provider_id', to: 'provider_id' },
            { from: 'id', to: 'provider_game_id' },
            { from: 'name', to: 'provider_game_name' }
        ];

        return this.applyMappings(data, {}, mappings);
    }

    public convert(data: any): any {

        const result = { search_api_keys: [this.mapSearchKeys(data)] };

        return this.applyMapping(data, result, { from: 'name', to: 'name' });
    }
}
