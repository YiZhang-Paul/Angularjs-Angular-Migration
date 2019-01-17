import { expect } from 'chai';

import MixerGameDataAdapter from '../../../../data-collector/services/MixerGameDataAdapter';

context('MixerGameDataAdapter unit test', () => {

    let adapter: MixerGameDataAdapter;

    beforeEach('test setup', () => {

        adapter = new MixerGameDataAdapter();
    });

    describe('convert()', () => {

        it('should convert to valid data format', () => {

            const data = {

                name: 'random_name',
                provider_id: '2',
                id: '1386'
            };

            const expected = {

                name: data.name,
                search_api_keys: [

                    {
                        provider_id: data.provider_id,
                        provider_game_id: data.id,
                        provider_game_name: data.name
                    }
                ]
            };

            const result = adapter.convert(data);

            expect(result).to.deep.equal(expected);
        });

        it('should fail to convert to valid data format', () => {

            const data = { 'irrelevant_field': 'irrelevant_value' };
            const expected = { search_api_keys: [{}] };

            const result = adapter.convert(data);

            expect(result).to.deep.equal(expected);
        });
    });
});
