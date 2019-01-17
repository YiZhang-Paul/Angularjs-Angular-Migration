import { expect } from 'chai';

import MixerChannelDataAdapter from '../../../../data-collector/services/MixerChannelDataAdapter';

context('MixerChannelDataAdapter unit test', () => {

    let adapter: MixerChannelDataAdapter;

    beforeEach('test setup', () => {

        adapter = new MixerChannelDataAdapter();
    });

    describe('convert()', () => {

        it('should convert to valid data format', () => {

            const data = {

                id: '18202595',
                provider_id: '2'
            };

            const expected = {

                provider_id: data.provider_id,
                provider_channel_id: data.id
            };

            const result = adapter.convert(data);

            expect(result).to.deep.equal(expected);
        });

        it('should fail to convert to valid data format', () => {

            const data = { 'irrelevant_field': 'irrelevant_value' };
            const expected = {};

            const result = adapter.convert(data);

            expect(result).to.deep.equal(expected);
        });
    });
});
