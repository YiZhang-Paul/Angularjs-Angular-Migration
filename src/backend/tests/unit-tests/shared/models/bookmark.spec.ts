import { expect } from 'chai';

import BookmarkModel from '../../../../shared/models/bookmark';
import { getValidationError } from '../../../mongooseTestUtilities';

const idField = 'id';
const channelIdField = 'channel_id';
const titleField = 'title';
const streamerNameField = 'streamer_name';

context('User model unit test', () => {

    describe(`${idField}`, () => {

        it('should be required', async () => {

            const model = new BookmarkModel();

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new BookmarkModel({ [idField]: 'not_a_number' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new BookmarkModel({ [idField]: '55.5' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${idField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new BookmarkModel({ [idField]: '-1' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe(`${channelIdField}`, () => {

        it('should be required', async () => {

            const model = new BookmarkModel();

            const error = await getValidationError(model, channelIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new BookmarkModel({ [channelIdField]: 'not_a_number' });

            const error = await getValidationError(model, channelIdField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new BookmarkModel({ [channelIdField]: '55.5' });

            const error = await getValidationError(model, channelIdField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${channelIdField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new BookmarkModel({ [channelIdField]: '-1' });

            const error = await getValidationError(model, channelIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe(`${titleField}`, () => {

        it('should be a string', async () => {

            const model = new BookmarkModel({ [titleField]: {} });

            const error = await getValidationError(model, titleField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be shorter than or equal to 150 characters', async () => {

            const model = new BookmarkModel({ [titleField]: 'x'.repeat(151) });

            const error = await getValidationError(model, titleField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });
    });

    describe(`${streamerNameField}`, () => {

        it('should be a string', async () => {

            const model = new BookmarkModel({ [streamerNameField]: {} });

            const error = await getValidationError(model, streamerNameField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be shorter than or equal to 150 characters', async () => {

            const model = new BookmarkModel({ [streamerNameField]: 'x'.repeat(51) });

            const error = await getValidationError(model, streamerNameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });
    });
});
