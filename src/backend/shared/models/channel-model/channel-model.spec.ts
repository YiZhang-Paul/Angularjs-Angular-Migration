import { verifyCastError, verifyCustomError, verifyValidationError } from '../../test-utilities/mongoose-test-utilities';

import ChannelModel from './channel-model';

const idField = 'id';
const providerIdField = 'provider_id';
const providerChannelIdField = 'provider_channel_id';

context('Channel model unit test', () => {

    describe(`${idField}`, () => {

        it('should be required', async () => {

            const model = new ChannelModel();

            await verifyValidationError(model, idField, 'required');
        });

        it('should be a number', async () => {

            const model = new ChannelModel({ [idField]: 'not_a_number' });

            await verifyCastError(model, idField);
        });

        it('should be an integer', async () => {

            const model = new ChannelModel({ [idField]: '55.5' });
            const errorMessage = `${idField} must be an integer.`;

            await verifyCustomError(model, idField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new ChannelModel({ [idField]: '-1' });

            await verifyValidationError(model, idField, 'min');
        });
    });

    describe(`${providerIdField}`, () => {

        it('should be required', async () => {

            const model = new ChannelModel();

            await verifyValidationError(model, providerIdField, 'required');
        });

        it('should be a number', async () => {

            const model = new ChannelModel({ [providerIdField]: 'not_a_number' });

            await verifyCastError(model, providerIdField);
        });

        it('should be an integer', async () => {

            const model = new ChannelModel({ [providerIdField]: '55.5' });
            const errorMessage = `${providerIdField} must be an integer.`;

            await verifyCustomError(model, providerIdField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new ChannelModel({ [providerIdField]: '-1' });

            await verifyValidationError(model, providerIdField, 'min');
        });
    });

    describe(`${providerChannelIdField}`, () => {

        it('should be required', async () => {

            const model = new ChannelModel();

            await verifyValidationError(model, providerChannelIdField, 'required');
        });

        it('should be a number', async () => {

            const model = new ChannelModel({ [providerChannelIdField]: 'not_a_number' });

            await verifyCastError(model, providerChannelIdField);
        });

        it('should be an integer', async () => {

            const model = new ChannelModel({ [providerChannelIdField]: '55.5' });
            const errorMessage = `${providerChannelIdField} must be an integer.`;

            await verifyCustomError(model, providerChannelIdField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new ChannelModel({ [providerChannelIdField]: '-1' });

            await verifyValidationError(model, providerChannelIdField, 'min');
        });
    });
});
