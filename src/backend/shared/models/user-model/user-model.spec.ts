import { expect } from 'chai';

import { getField, verifyCastError, verifyCustomError, verifyValidationError } from '../../test-utilities/mongoose-test-utilities';

import UserModel from './user-model';

const userIdField = 'id';
const accountIdField = 'account_id';
const nameField = 'name';
const viewHistoriesField = 'view_histories';
const bookmarksField = 'bookmarks';
const keywordsField = 'keywords';
const dateField = 'date';
const gameSearchField = 'game_search';
const gameIdField = 'game_id';
const countField = 'count';

context('User model unit test', () => {

    describe(`${userIdField}`, () => {

        it('should be required', async () => {

            const model = new UserModel();

            await verifyValidationError(model, userIdField, 'required');
        });

        it('should be a number', async () => {

            const model = new UserModel({ [userIdField]: 'not_a_number' });

            await verifyCastError(model, userIdField);
        });

        it('should be an integer', async () => {

            const model = new UserModel({ [userIdField]: '55.5' });
            const errorMessage = `${userIdField} must be an integer.`;

            await verifyCustomError(model, userIdField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new UserModel({ [userIdField]: '-1' });

            await verifyValidationError(model, userIdField, 'min');
        });
    });

    describe(`${accountIdField}`, () => {

        it('should be required', async () => {

            const model = new UserModel();

            await verifyValidationError(model, accountIdField, 'required');
        });

        it('should be a number', async () => {

            const model = new UserModel({ [accountIdField]: 'not_a_number' });

            await verifyCastError(model, accountIdField);
        });

        it('should be an integer', async () => {

            const model = new UserModel({ [accountIdField]: '55.5' });
            const errorMessage = `${accountIdField} must be an integer.`;

            await verifyCustomError(model, accountIdField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new UserModel({ [accountIdField]: '-1' });

            await verifyValidationError(model, accountIdField, 'min');
        });
    });

    describe(`${nameField}`, () => {

        it('should be required', async () => {

            const model = new UserModel();

            await verifyValidationError(model, nameField, 'required');
        });

        it('should be a string', async () => {

            const model = new UserModel({ [nameField]: {} });

            await verifyCastError(model, nameField);
        });

        it('should be longer than or equal to 4 characters', async () => {

            const model = new UserModel({ [nameField]: 'x'.repeat(3) });

            await verifyValidationError(model, nameField, 'minlength');
        });

        it('should be shorter than or equal to 40 characters', async () => {

            const model = new UserModel({ [nameField]: 'x'.repeat(41) });

            await verifyValidationError(model, nameField, 'maxlength');
        });
    });

    describe(`${viewHistoriesField}`, () => {

        it('should be required', async () => {

            const model = new UserModel();

            await verifyValidationError(model, viewHistoriesField, 'required');
        });

        it('should be a string', async () => {

            const model = new UserModel({ [viewHistoriesField]: {} });

            await verifyCastError(model, viewHistoriesField);
        });

        it('should be a valid url', async () => {

            const model = new UserModel({ [viewHistoriesField]: 'not_a_url' });
            const errorMessage = `${viewHistoriesField} must be a valid URI.`;

            await verifyCustomError(model, viewHistoriesField, errorMessage);
        });
    });

    describe(`${bookmarksField}`, () => {

        it('should be required', async () => {

            const model = new UserModel();

            await verifyValidationError(model, bookmarksField, 'required');
        });

        it('should be a string', async () => {

            const model = new UserModel({ [bookmarksField]: {} });

            await verifyCastError(model, bookmarksField);
        });

        it('should be a valid url', async () => {

            const model = new UserModel({ [bookmarksField]: 'not_a_url' });
            const errorMessage = `${bookmarksField} must be a valid URI.`;

            await verifyCustomError(model, bookmarksField, errorMessage);
        });
    });

    describe(`${keywordsField}::${dateField}`, () => {

        it('should default to current date', () => {

            const expected = new Date().toDateString();
            const model = new UserModel({ [keywordsField]: [{}] });

            const keyword = getField(model, keywordsField)[0];
            const date = new Date(keyword[dateField]);
            const result = date.toDateString();

            expect(result).to.equal(expected);
        });
    });

    describe(`${keywordsField}::${gameSearchField}`, () => {
        // equivalent to <model>.keywords[0].game_search
        const targetField = `${keywordsField}.0.${gameSearchField}`;

        it('should be non-empty', async () => {

            const model = new UserModel(setKeyword());
            const errorMessage = `${gameSearchField} must be non-empty.`;

            await verifyCustomError(model, targetField, errorMessage);
        });
    });

    describe(`${keywordsField}::${gameSearchField}::${gameIdField}`, () => {
        // equivalent to <model>.keywords[0].game_search[0].game_id
        const targetField = `${keywordsField}.0.${gameSearchField}.0.${gameIdField}`;

        it('should be required', async () => {

            const model = new UserModel(setGameSearch());

            await verifyValidationError(model, targetField, 'required');
        });

        it('should be a number', async () => {

            const model = new UserModel(setGameSearch(gameIdField, 'not_a_number'));

            await verifyCastError(model, targetField);
        });

        it('should be an integer', async () => {

            const model = new UserModel(setGameSearch(gameIdField, '55.5'));
            const errorMessage = `${gameIdField} must be an integer.`;

            await verifyCustomError(model, targetField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new UserModel(setGameSearch(gameIdField, '-1'));

            await verifyValidationError(model, targetField, 'min');
        });
    });

    describe(`${keywordsField}::${gameSearchField}::${countField}`, () => {
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

            await verifyCastError(model, targetField);
        });

        it('should be an integer', async () => {

            const model = new UserModel(setGameSearch(countField, '55.5'));
            const errorMessage = `${countField} must be an integer.`;

            await verifyCustomError(model, targetField, errorMessage);
        });

        it('should be larger than or equal to 1', async () => {

            const model = new UserModel(setGameSearch(countField, '0'));

            await verifyValidationError(model, targetField, 'min');
        });
    });
});

function setKeyword(field = '', value: any = {}): any {

    const keyword: any = {};

    if (field.length > 0) {

        keyword[field] = value;
    }

    return { [keywordsField]: [keyword] };
}

function setGameSearch(field = '', value: any = {}): any {

    const gameSearch: any = {};

    if (field.length > 0) {

        gameSearch[field] = value;
    }

    return setKeyword(gameSearchField, [gameSearch]);
}
