import { expect } from 'chai';

import MixerDataConverter from '../../../../data-collector/services/MixerDataConverter';

context('MixerDataConverter unit test', () => {

    const providerId = '2';
    let converter: MixerDataConverter;

    beforeEach('test setup', () => {

        converter = new MixerDataConverter(providerId);
    });

    describe('convertGameData()', () => {

        it('');
        it('');
        it('');
    });

    describe('convertChannelData()', () => {

        it('should convert to valid data format', async () => {

            const data = { id: '18202595' };

            const expected = {

                provider_id: providerId,
                provider_channel_id: data.id
            };

            const result = converter.convert(data);

            expect(result.id).to.be.undefined;
            expect(result).to.deep.equal(expected);
        });

        it('should fail to convert to valid data format', () => {

            const data = { 'irrelvant' };
        });
    });
});
