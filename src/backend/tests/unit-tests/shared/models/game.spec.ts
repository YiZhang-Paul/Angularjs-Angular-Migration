import { expect } from 'chai';

import GameModel from '../../../../shared/models/game';
import { getValidationError } from '../../../mongooseTestUtilities';

const idField = 'id';
const nameField = 'name';
const searchApiKeysField = 'search_api_keys';
const genreField = 'genre';
const providerIdField = 'provider_id';
const providerGameIdField = 'provider_game_id';
const providerGameNameField = 'provider_game_name';

context('Game model unit test', () => {

    describe(`${idField}`, () => {

        it('should be required', async () => {

            const model = new GameModel();

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new GameModel({ [idField]: 'not_a_number' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new GameModel({ [idField]: '55.5' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${idField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new GameModel({ [idField]: '-1' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe(`${nameField}`, () => {

        it('should be required', async () => {

            const model = new GameModel();

            const error = await getValidationError(model, nameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new GameModel({ [nameField]: {} });

            const error = await getValidationError(model, nameField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be shorter than or equal to 100 characters', async () => {

            const model = new GameModel({ [nameField]: 'x'.repeat(101) });

            const error = await getValidationError(model, nameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });
    });

    describe(`${searchApiKeysField}`, () => {

        it('should be required', async () => {

            const model = new GameModel();

            const error = await getValidationError(model, searchApiKeysField);
            await model.validate(err => {

                console.log(model.toObject());
                console.log(err);
            });
            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });
    });

    describe(`${genreField}`, () => {

        it('should be required', async () => {

            const model = new GameModel();

            const error = await getValidationError(model, genreField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new GameModel({ [genreField]: {} });

            const error = await getValidationError(model, genreField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be shorter than or equal to 40 characters', async () => {

            const model = new GameModel({ [genreField]: 'x'.repeat(41) });

            const error = await getValidationError(model, genreField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });
    });

    describe(`${providerIdField}`, () => {

        it('should be required', async () => {

            const model = new GameModel();

            const error = await getValidationError(model, providerIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new GameModel({ [providerIdField]: 'not_a_number' });

            const error = await getValidationError(model, providerIdField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new GameModel({ [providerIdField]: '55.5' });

            const error = await getValidationError(model, providerIdField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${providerIdField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new GameModel({ [providerIdField]: '-1' });

            const error = await getValidationError(model, providerIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe(`${providerGameIdField}`, () => {

        it('should be required', async () => {

            const model = new GameModel();

            const error = await getValidationError(model, providerGameIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new GameModel({ [providerGameIdField]: 'not_a_number' });

            const error = await getValidationError(model, providerGameIdField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new GameModel({ [providerGameIdField]: '55.5' });

            const error = await getValidationError(model, providerGameIdField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${providerGameIdField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new GameModel({ [providerGameIdField]: '-1' });

            const error = await getValidationError(model, providerGameIdField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe(`${providerGameNameField}`, () => {

        it('should be required', async () => {

            const model = new GameModel();

            const error = await getValidationError(model, providerGameNameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new GameModel({ [providerGameNameField]: {} });

            const error = await getValidationError(model, providerGameNameField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be shorter than or equal to 100 characters', async () => {

            const model = new GameModel({ [providerGameNameField]: 'x'.repeat(101) });

            const error = await getValidationError(model, providerGameNameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });
    });
});
