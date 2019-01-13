import { expect } from 'chai';

import { getField, getValidationError } from '../../../mongooseTestUtilities';
import UserModel from '../../../../shared/models/user';

context('User model unit test', () => {

    describe('user_id', () => {

        const field = 'user_id';

        it('should be required', async () => {

            const model = new UserModel();

            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new UserModel({ [field]: 'not_a_number' });

            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new UserModel({ [field]: '55.5' });

            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${field} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new UserModel({ [field]: '-1' });

            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe('name', () => {

        const field = 'name';

        it('should be required', async () => {

            const model = new UserModel();

            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new UserModel({ [field]: {} });

            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be longer than or equal to 4 characters', async () => {

            const model = new UserModel({ [field]: 'x'.repeat(3) });

            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.kind).to.equal('minlength');
        });

        it('should be shorter than or equal to 40 characters', async () => {

            const model = new UserModel({ [field]: 'x'.repeat(41) });

            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });
    });

    describe('view_histories', () => {

        const field = 'view_histories';

        it('should be required', async () => {

            const model = new UserModel();

            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new UserModel({ [field]: {} });

            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be a valid url', async () => {

            const model = new UserModel({ [field]: 'not_a_url' });

            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${field} must be a valid URI.`);
        });
    });

    describe('bookmarks', () => {

        const field = 'bookmarks';

        it('should be required', async () => {

            const model = new UserModel();

            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new UserModel({ [field]: {} });

            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be a valid url', async () => {

            const model = new UserModel({ [field]: 'not_a_url' });

            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${field} must be a valid URI.`);
        });
    });
    // TODO: refactor these
    describe('keywords: date', () => {

        const parentField = 'keywords';
        const childrenField = 'date';

        it('should default to current date', async () => {

            const expected = new Date().toDateString();
            const model = new UserModel({ [parentField]: [{}] });

            const keyword = getField(model, parentField)[0];
            const result = new Date(keyword[childrenField]);

            expect(result.toDateString()).to.equal(expected);
        });
    });

    describe('keywords: game_search: game_id', () => {

        const grandparentField = 'keywords';
        const parentField = 'game_search';
        const childrenField = 'game_id';

        it('should be required', async () => {

            const gameSearches = [{}];
            const keywords = [{ [parentField]: gameSearches }];
            const model = new UserModel({ [grandparentField]: keywords });

            // equivalent to model.keywords[0].game_search[0].game_id
            const field = `${grandparentField}.0.${parentField}.0.${childrenField}`;
            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const gameSearches = [{ [childrenField]: 'not_a_number' }];
            const keywords = [{ [parentField]: gameSearches }];
            const model = new UserModel({ [grandparentField]: keywords });

            // equivalent to model.keywords[0].game_search[0].game_id
            const field = `${grandparentField}.0.${parentField}.0.${childrenField}`;
            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const gameSearches = [{ [childrenField]: '55.5' }];
            const keywords = [{ [parentField]: gameSearches }];
            const model = new UserModel({ [grandparentField]: keywords });

            // equivalent to model.keywords[0].game_search[0].game_id
            const field = `${grandparentField}.0.${parentField}.0.${childrenField}`;
            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${childrenField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const gameSearches = [{ [childrenField]: '-1' }];
            const keywords = [{ [parentField]: gameSearches }];
            const model = new UserModel({ [grandparentField]: keywords });

            // equivalent to model.keywords[0].game_search[0].game_id
            const field = `${grandparentField}.0.${parentField}.0.${childrenField}`;
            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe('keywords: game_search: count', () => {

        const grandparentField = 'keywords';
        const parentField = 'game_search';
        const childrenField = 'count';

        it('should default to 1', () => {

            const expected = 1;
            const gameSearches = [{}];
            const keywords = [{ [parentField]: gameSearches }];
            const model = new UserModel({ [grandparentField]: keywords });

            const keyword = getField(model, grandparentField)[0];
            const gameSearch = keyword[parentField][0];
            const result = gameSearch[childrenField];

            expect(result).to.equal(expected);
        });

        it('should be a number', async () => {

            const gameSearches = [{ [childrenField]: 'not_a_number' }];
            const keywords = [{ [parentField]: gameSearches }];
            const model = new UserModel({ [grandparentField]: keywords });

            // equivalent to model.keywords[0].game_search[0].count
            const field = `${grandparentField}.0.${parentField}.0.${childrenField}`;
            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const gameSearches = [{ [childrenField]: '55.5' }];
            const keywords = [{ [parentField]: gameSearches }];
            const model = new UserModel({ [grandparentField]: keywords });

            // equivalent to model.keywords[0].game_search[0].count
            const field = `${grandparentField}.0.${parentField}.0.${childrenField}`;
            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${childrenField} must be an integer.`);
        });

        it('should be larger than or equal to 1', async () => {

            const gameSearches = [{ [childrenField]: '0' }];
            const keywords = [{ [parentField]: gameSearches }];
            const model = new UserModel({ [grandparentField]: keywords });

            // equivalent to model.keywords[0].game_search[0].count
            const field = `${grandparentField}.0.${parentField}.0.${childrenField}`;
            const error = await getValidationError(model, field);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });
});
