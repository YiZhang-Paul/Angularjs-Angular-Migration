import { expect } from 'chai';

import { getField, getValidationError } from '../../../mongooseTestUtilities';
import UserModel from '../../../../shared/models/user';

const userIdField = 'user_id';
const nameField = 'name';
const viewHistoriesField = 'view_histories';
const bookmarksField = 'bookmarks';
const keywordsField = 'keywords';
const dateField = 'date';
const gameSearchField = 'game_search';
const gameIdField = 'game_id';
const countField = 'count';

context('User model unit test', () => {

    describe('user_id', () => {

        it('should be required', async () => {

            const model = new UserModel();

            const error = await getValidationError(model, userIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new UserModel({ [userIdField]: 'not_a_number' });

            const error = await getValidationError(model, userIdField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new UserModel({ [userIdField]: '55.5' });

            const error = await getValidationError(model, userIdField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${userIdField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new UserModel({ [userIdField]: '-1' });

            const error = await getValidationError(model, userIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe('name', () => {

        it('should be required', async () => {

            const model = new UserModel();

            const error = await getValidationError(model, nameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new UserModel({ [nameField]: {} });

            const error = await getValidationError(model, nameField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be longer than or equal to 4 characters', async () => {

            const model = new UserModel({ [nameField]: 'x'.repeat(3) });

            const error = await getValidationError(model, nameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('minlength');
        });

        it('should be shorter than or equal to 40 characters', async () => {

            const model = new UserModel({ [nameField]: 'x'.repeat(41) });

            const error = await getValidationError(model, nameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });
    });

    describe('view_histories', () => {

        it('should be required', async () => {

            const model = new UserModel();

            const error = await getValidationError(model, viewHistoriesField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new UserModel({ [viewHistoriesField]: {} });

            const error = await getValidationError(model, viewHistoriesField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be a valid url', async () => {

            const model = new UserModel({ [viewHistoriesField]: 'not_a_url' });

            const error = await getValidationError(model, viewHistoriesField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${viewHistoriesField} must be a valid URI.`);
        });
    });

    describe('bookmarks', () => {

        it('should be required', async () => {

            const model = new UserModel();

            const error = await getValidationError(model, bookmarksField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new UserModel({ [bookmarksField]: {} });

            const error = await getValidationError(model, bookmarksField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be a valid url', async () => {

            const model = new UserModel({ [bookmarksField]: 'not_a_url' });

            const error = await getValidationError(model, bookmarksField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${bookmarksField} must be a valid URI.`);
        });
    });

    describe('keywords::date', () => {

        it('should default to current date', () => {

            const expected = new Date().toDateString();
            const model = new UserModel({ [keywordsField]: [{}] });

            const keyword = getField(model, keywordsField)[0];
            const date = new Date(keyword[dateField]);
            const result = date.toDateString();

            expect(result).to.equal(expected);
        });
    });

    describe('keywords::game_search::game_id', () => {
        // equivalent to <model>.keywords[0].game_search[0].game_id
        const targetField = `${keywordsField}.0.${gameSearchField}.0.${gameIdField}`;

        it('should be required', async () => {

            const model = new UserModel(setGameSearch());

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new UserModel(setGameSearch(gameIdField, 'not_a_number'));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new UserModel(setGameSearch(gameIdField, '55.5'));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${gameIdField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new UserModel(setGameSearch(gameIdField, '-1'));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe('keywords::game_search::count', () => {
        // equivalent to model.keywords[0].game_search[0].count
        const targetField = `${keywordsField}.0.${gameSearchField}.0.${countField}`;

        it('should default to 1', () => {

            const expected = 1;
            const model = new UserModel(setGameSearch());

            const keyword = getField(model, keywordsField)[0];
            const gameSearch = keyword[gameSearchField][0];
            const result = gameSearch[countField];

            expect(result).to.equal(expected);
        });

        it('should be a number', async () => {

            const model = new UserModel(setGameSearch(countField, 'not_a_number'));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new UserModel(setGameSearch(countField, '55.5'));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${countField} must be an integer.`);
        });

        it('should be larger than or equal to 1', async () => {

            const model = new UserModel(setGameSearch(countField, '0'));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });
});

function setGameSearch(field = '', value: any = {}): any {

    const gameSearch: any = {};
    const gameSearches = [gameSearch];
    const keywords = [{ [gameSearchField]: gameSearches }];

    if (field.length > 0) {

        gameSearch[field] = value;
    }

    return { [keywordsField]: keywords };
}
