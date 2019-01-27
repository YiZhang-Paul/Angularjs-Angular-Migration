import { verifyCastError, verifyCustomError, verifyValidationError } from '../../test-utilities/mongoose-test-utilities';

import BookmarkModel from './bookmark-model';

const idField = 'id';
const userIdField = 'user_id';
const providerIdField = 'provider_id';
const providerChannelIdField = 'provider_channel_id';
const channelIdField = 'channel_id';
const titleField = 'title';
const streamerNameField = 'streamer_name';
const imageField = 'image';
const bannerField = 'banner';

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

    describe(`${userIdField}`, () => {

        it('should be required', async () => {

            const model = new BookmarkModel();

            await verifyValidationError(model, userIdField, 'required');
        });

        it('should be a number', async () => {

            const model = new BookmarkModel({ [userIdField]: 'not_a_number' });

            await verifyCastError(model, userIdField);
        });

        it('should be an integer', async () => {

            const model = new BookmarkModel({ [userIdField]: '55.5' });
            const errorMessage = `${userIdField} must be an integer.`;

            await verifyCustomError(model, userIdField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new BookmarkModel({ [userIdField]: '-1' });

            await verifyValidationError(model, userIdField, 'min');
        });
    });

    describe(`${providerIdField}`, () => {

        it('should be required', async () => {

            const model = new BookmarkModel();

            await verifyValidationError(model, providerIdField, 'required');
        });

        it('should be a number', async () => {

            const model = new BookmarkModel({ [providerIdField]: 'not_a_number' });

            await verifyCastError(model, providerIdField);
        });

        it('should be an integer', async () => {

            const model = new BookmarkModel({ [providerIdField]: '55.5' });
            const errorMessage = `${providerIdField} must be an integer.`;

            await verifyCustomError(model, providerIdField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new BookmarkModel({ [providerIdField]: '-1' });

            await verifyValidationError(model, providerIdField, 'min');
        });
    });

    describe(`${providerChannelIdField}`, () => {

        it('should be required', async () => {

            const model = new BookmarkModel();

            await verifyValidationError(model, providerChannelIdField, 'required');
        });

        it('should be a number', async () => {

            const model = new BookmarkModel({ [providerChannelIdField]: 'not_a_number' });

            await verifyCastError(model, providerChannelIdField);
        });

        it('should be an integer', async () => {

            const model = new BookmarkModel({ [providerChannelIdField]: '55.5' });
            const errorMessage = `${providerChannelIdField} must be an integer.`;

            await verifyCustomError(model, providerChannelIdField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new BookmarkModel({ [providerChannelIdField]: '-1' });

            await verifyValidationError(model, providerChannelIdField, 'min');
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

    describe(`${imageField}`, () => {

        it('should be a string', async () => {

            const model = new BookmarkModel({ [imageField]: {} });

            await verifyCastError(model, imageField);
        });

        it('should be a valid url', async () => {

            const model = new BookmarkModel({ [imageField]: 'not_a_url' });
            const errorMessage = `${imageField} must be a valid URI.`;

            await verifyCustomError(model, imageField, errorMessage);
        });
    });

    describe(`${bannerField}`, () => {

        it('should be a string', async () => {

            const model = new BookmarkModel({ [bannerField]: {} });

            await verifyCastError(model, bannerField);
        });

        it('should be a valid url', async () => {

            const model = new BookmarkModel({ [bannerField]: 'not_a_url' });
            const errorMessage = `${bannerField} must be a valid URI.`;

            await verifyCustomError(model, bannerField, errorMessage);
        });
    });
});
