import { verifyCastError, verifyCustomError, verifyValidationError } from '../../test-utilities/mongoose-test-utilities';

import ViewHistoryModel from './view-history-model';

const idField = 'id';
const userIdField = 'user_id';
const channelIdField = 'channel_id';
const titleField = 'title';
const streamerNameField = 'streamer_name';
const gameIdField = 'game_id';
const gameNameField = 'game_name';
const imageField = 'image';
const thumbnailField = 'thumbnail';

context('View History model unit test', () => {

    describe(`${idField}`, () => {

        it('should be required', async () => {

            const model = new ViewHistoryModel();

            await verifyValidationError(model, idField, 'required');
        });

        it('should be a number', async () => {

            const model = new ViewHistoryModel({ [idField]: 'not_a_number' });

            await verifyCastError(model, idField);
        });

        it('should be an integer', async () => {

            const model = new ViewHistoryModel({ [idField]: '55.5' });
            const errorMessage = `${idField} must be an integer.`;

            await verifyCustomError(model, idField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new ViewHistoryModel({ [idField]: '-1' });

            await verifyValidationError(model, idField, 'min');
        });
    });

    describe(`${userIdField}`, () => {

        it('should be required', async () => {

            const model = new ViewHistoryModel();

            await verifyValidationError(model, userIdField, 'required');
        });

        it('should be a number', async () => {

            const model = new ViewHistoryModel({ [userIdField]: 'not_a_number' });

            await verifyCastError(model, userIdField);
        });

        it('should be an integer', async () => {

            const model = new ViewHistoryModel({ [userIdField]: '55.5' });
            const errorMessage = `${userIdField} must be an integer.`;

            await verifyCustomError(model, userIdField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new ViewHistoryModel({ [userIdField]: '-1' });

            await verifyValidationError(model, userIdField, 'min');
        });
    });

    describe(`${channelIdField}`, () => {

        it('should be required', async () => {

            const model = new ViewHistoryModel();

            await verifyValidationError(model, channelIdField, 'required');
        });

        it('should be a number', async () => {

            const model = new ViewHistoryModel({ [channelIdField]: 'not_a_number' });

            await verifyCastError(model, channelIdField);
        });

        it('should be an integer', async () => {

            const model = new ViewHistoryModel({ [channelIdField]: '55.5' });
            const errorMessage = `${channelIdField} must be an integer.`;

            await verifyCustomError(model, channelIdField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new ViewHistoryModel({ [channelIdField]: '-1' });

            await verifyValidationError(model, channelIdField, 'min');
        });
    });

    describe(`${titleField}`, () => {

        it('should be a string', async () => {

            const model = new ViewHistoryModel({ [titleField]: {} });

            await verifyCastError(model, titleField);
        });

        it('should be shorter than or equal to 150 characters', async () => {

            const model = new ViewHistoryModel({ [titleField]: 'x'.repeat(151) });

            await verifyValidationError(model, titleField, 'maxlength');
        });
    });

    describe(`${streamerNameField}`, () => {

        it('should be a string', async () => {

            const model = new ViewHistoryModel({ [streamerNameField]: {} });

            await verifyCastError(model, streamerNameField);
        });

        it('should be shorter than or equal to 50 characters', async () => {

            const model = new ViewHistoryModel({ [streamerNameField]: 'x'.repeat(51) });

            await verifyValidationError(model, streamerNameField, 'maxlength');
        });
    });

    describe(`${gameIdField}`, () => {

        it('should be required', async () => {

            const model = new ViewHistoryModel();

            await verifyValidationError(model, gameIdField, 'required');
        });

        it('should be a number', async () => {

            const model = new ViewHistoryModel({ [gameIdField]: 'not_a_number' });

            await verifyCastError(model, gameIdField);
        });

        it('should be an integer', async () => {

            const model = new ViewHistoryModel({ [gameIdField]: '55.5' });
            const errorMessage = `${gameIdField} must be an integer.`;

            await verifyCustomError(model, gameIdField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new ViewHistoryModel({ [gameIdField]: '-1' });

            await verifyValidationError(model, gameIdField, 'min');
        });
    });

    describe(`${gameNameField}`, () => {

        it('should be required', async () => {

            const model = new ViewHistoryModel();

            await verifyValidationError(model, gameNameField, 'required');
        });

        it('should be a string', async () => {

            const model = new ViewHistoryModel({ [gameNameField]: {} });

            await verifyCastError(model, gameNameField);
        });

        it('should be shorter than or equal to 100 characters', async () => {

            const model = new ViewHistoryModel({ [gameNameField]: 'x'.repeat(101) });

            await verifyValidationError(model, gameNameField, 'maxlength');
        });
    });

    describe(`${imageField}`, () => {

        it('should be a string', async () => {

            const model = new ViewHistoryModel({ [imageField]: {} });

            await verifyCastError(model, imageField);
        });

        it('should be a valid url', async () => {

            const model = new ViewHistoryModel({ [imageField]: 'not_a_url' });
            const errorMessage = `${imageField} must be a valid URI.`;

            await verifyCustomError(model, imageField, errorMessage);
        });
    });

    describe(`${thumbnailField}`, () => {

        it('should be a string', async () => {

            const model = new ViewHistoryModel({ [thumbnailField]: {} });

            await verifyCastError(model, thumbnailField);
        });

        it('should be a valid url', async () => {

            const model = new ViewHistoryModel({ [thumbnailField]: 'not_a_url' });
            const errorMessage = `${thumbnailField} must be a valid URI.`;

            await verifyCustomError(model, thumbnailField, errorMessage);
        });
    });
});
