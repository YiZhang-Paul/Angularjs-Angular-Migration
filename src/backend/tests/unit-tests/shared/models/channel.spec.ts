import { expect } from 'chai';

import ChannelModel from '../../../../shared/models/channel';
import { getValidationError } from '../../../mongooseTestUtilities';

const idField = 'id';
const providerIdField = 'provider_id';
const providerChannelIdField = 'provider_channel_id';

context('Channel model unit test', () => {

    describe(`${idField}`, () => {

        it('should be required', async () => {

            const model = new ChannelModel();

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new ChannelModel({ [idField]: 'not_a_number' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new ChannelModel({ [idField]: '55.5' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${idField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new ChannelModel({ [idField]: '-1' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe(`${providerIdField}`, () => {

        it('should be required', async () => {

            const model = new ChannelModel();

            const error = await getValidationError(model, providerIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new ChannelModel({ [providerIdField]: 'not_a_number' });

            const error = await getValidationError(model, providerIdField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new ChannelModel({ [providerIdField]: '55.5' });

            const error = await getValidationError(model, providerIdField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${providerIdField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new ChannelModel({ [providerIdField]: '-1' });

            const error = await getValidationError(model, providerIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe(`${providerChannelIdField}`, () => {

        it('should be required', async () => {

            const model = new ChannelModel();

            const error = await getValidationError(model, providerChannelIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new ChannelModel({ [providerChannelIdField]: 'not_a_number' });

            const error = await getValidationError(model, providerChannelIdField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new ChannelModel({ [providerChannelIdField]: '55.5' });

            const error = await getValidationError(model, providerChannelIdField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${providerChannelIdField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new ChannelModel({ [providerChannelIdField]: '-1' });

            const error = await getValidationError(model, providerChannelIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });
});
