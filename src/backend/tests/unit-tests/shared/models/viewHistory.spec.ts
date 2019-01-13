import { expect } from 'chai';

import { getValidationError } from '../../../mongooseTestUtilities';
import ViewHistoryModel from '../../../../shared/models/viewHistory';

const idField = 'id';
const channelIdField = 'channel_id';
const titleField = 'title';
const streamerNameField = 'streamer_name';
const gameIdField = 'game_id';
const gameNameField = 'game_name';
const imageField = 'image';

context('View History model unit test', () => {

    describe(`${idField}`, () => {

        it('should be required', async () => {

            const model = new ViewHistoryModel();

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new ViewHistoryModel({ [idField]: 'not_a_number' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new ViewHistoryModel({ [idField]: '55.5' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${idField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new ViewHistoryModel({ [idField]: '-1' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe(`${channelIdField}`, () => {

        it('should be required', async () => {

            const model = new ViewHistoryModel();

            const error = await getValidationError(model, channelIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new ViewHistoryModel({ [channelIdField]: 'not_a_number' });

            const error = await getValidationError(model, channelIdField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new ViewHistoryModel({ [channelIdField]: '55.5' });

            const error = await getValidationError(model, channelIdField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${channelIdField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new ViewHistoryModel({ [channelIdField]: '-1' });

            const error = await getValidationError(model, channelIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe(`${titleField}`, () => {

        it('should be a string', async () => {

            const model = new ViewHistoryModel({ [titleField]: {} });

            const error = await getValidationError(model, titleField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be shorter than or equal to 150 characters', async () => {

            const model = new ViewHistoryModel({ [titleField]: 'x'.repeat(151) });

            const error = await getValidationError(model, titleField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });
    });

    describe(`${streamerNameField}`, () => {

        it('should be a string', async () => {

            const model = new ViewHistoryModel({ [streamerNameField]: {} });

            const error = await getValidationError(model, streamerNameField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be shorter than or equal to 50 characters', async () => {

            const model = new ViewHistoryModel({ [streamerNameField]: 'x'.repeat(51) });

            const error = await getValidationError(model, streamerNameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });
    });

    describe(`${gameIdField}`, () => {

        it('should be required', async () => {

            const model = new ViewHistoryModel();

            const error = await getValidationError(model, gameIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new ViewHistoryModel({ [gameIdField]: 'not_a_number' });

            const error = await getValidationError(model, gameIdField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new ViewHistoryModel({ [gameIdField]: '55.5' });

            const error = await getValidationError(model, gameIdField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${gameIdField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new ViewHistoryModel({ [gameIdField]: '-1' });

            const error = await getValidationError(model, gameIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe(`${gameNameField}`, () => {

        it('should be required', async () => {

            const model = new ViewHistoryModel();

            const error = await getValidationError(model, gameNameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new ViewHistoryModel({ [gameNameField]: {} });

            const error = await getValidationError(model, gameNameField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be shorter than or equal to 100 characters', async () => {

            const model = new ViewHistoryModel({ [gameNameField]: 'x'.repeat(101) });

            const error = await getValidationError(model, gameNameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });
    });

    describe(`${imageField}`, () => {

        it('should be required', async () => {

            const model = new ViewHistoryModel();

            const error = await getValidationError(model, imageField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new ViewHistoryModel({ [imageField]: {} });

            const error = await getValidationError(model, imageField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be a valid url', async () => {

            const model = new ViewHistoryModel({ [imageField]: 'not_a_url' });

            const error = await getValidationError(model, imageField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${imageField} must be a valid URI.`);
        });
    });
});
