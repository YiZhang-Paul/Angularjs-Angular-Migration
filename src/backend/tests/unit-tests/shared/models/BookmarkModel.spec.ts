import BookmarkModel from '../../../../shared/models/BookmarkModel';
import { verifyCastError, verifyCustomError, verifyValidationError } from '../../../mongooseTestUtilities';

const idField = 'id';
const channelIdField = 'channel_id';
const titleField = 'title';
const streamerNameField = 'streamer_name';

context('User model unit test', () => {

    describe(`${idField}`, () => {

        it('should be required', async () => {

            const model = new BookmarkModel();

            await verifyValidationError(model, idField, 'required');
        });

        it('should be a number', async () => {

            const model = new BookmarkModel({ [idField]: 'not_a_number' });

            await verifyCastError(model, idField);
        });

        it('should be an integer', async () => {

            const model = new BookmarkModel({ [idField]: '55.5' });
            const errorMessage = `${idField} must be an integer.`;

            await verifyCustomError(model, idField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new BookmarkModel({ [idField]: '-1' });

            await verifyValidationError(model, idField, 'min');
        });
    });

    describe(`${channelIdField}`, () => {

        it('should be required', async () => {

            const model = new BookmarkModel();

            await verifyValidationError(model, channelIdField, 'required');
        });

        it('should be a number', async () => {

            const model = new BookmarkModel({ [channelIdField]: 'not_a_number' });

            await verifyCastError(model, channelIdField);
        });

        it('should be an integer', async () => {

            const model = new BookmarkModel({ [channelIdField]: '55.5' });
            const errorMessage = `${channelIdField} must be an integer.`;

            await verifyCustomError(model, channelIdField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new BookmarkModel({ [channelIdField]: '-1' });

            await verifyValidationError(model, channelIdField, 'min');
        });
    });

    describe(`${titleField}`, () => {

        it('should be a string', async () => {

            const model = new BookmarkModel({ [titleField]: {} });

            await verifyCastError(model, titleField);
        });

        it('should be shorter than or equal to 150 characters', async () => {

            const model = new BookmarkModel({ [titleField]: 'x'.repeat(151) });

            await verifyValidationError(model, titleField, 'maxlength');
        });
    });

    describe(`${streamerNameField}`, () => {

        it('should be a string', async () => {

            const model = new BookmarkModel({ [streamerNameField]: {} });

            await verifyCastError(model, streamerNameField);
        });

        it('should be shorter than or equal to 150 characters', async () => {

            const model = new BookmarkModel({ [streamerNameField]: 'x'.repeat(51) });

            await verifyValidationError(model, streamerNameField, 'maxlength');
        });
    });
});
