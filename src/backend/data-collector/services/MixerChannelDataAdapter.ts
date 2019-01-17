import DataAdapter from './DataAdapter';

export default class MixerChannelDataAdapter extends DataAdapter {

    public convert(data: any): any {

        const mappings = [

            { from: 'provider_id', to: 'provider_id' },
            { from: 'id', to: 'provider_channel_id' }
        ];

        return this.applyMappings(data, {}, mappings);
    }
}
