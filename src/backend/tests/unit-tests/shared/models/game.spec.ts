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

    describe(`${searchApiKeysField}`, () => {

        it('should be non-empty', async () => {

            const model = new GameModel();

            const error = await getValidationError(model, searchApiKeysField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${searchApiKeysField} must be non-empty.`);
        });
    });

    describe(`${searchApiKeysField}::${providerIdField}`, () => {
        // equivalent to <model>.search_api_keys[0].provider_id
        const targetField = `${searchApiKeysField}.0.${providerIdField}`;

        it('should be required', async () => {

            const model = new GameModel(setSearchApiKeys());

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new GameModel(setSearchApiKeys(providerIdField, 'not_a_number'));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new GameModel(setSearchApiKeys(providerIdField, '55.5'));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${providerIdField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new GameModel(setSearchApiKeys(providerIdField, '-1'));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe(`${searchApiKeysField}::${providerGameIdField}`, () => {
        // equivalent to <model>.search_api_keys[0].provider_game_id
        const targetField = `${searchApiKeysField}.0.${providerGameIdField}`;

        it('should be required', async () => {

            const model = new GameModel(setSearchApiKeys());

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new GameModel(setSearchApiKeys(providerGameIdField, 'not_a_number'));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new GameModel(setSearchApiKeys(providerGameIdField, '55.5'));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${providerGameIdField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new GameModel(setSearchApiKeys(providerGameIdField, '-1'));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe(`${searchApiKeysField}::${providerGameNameField}`, () => {
        // equivalent to <model>.search_api_keys[0].provider_game_name
        const targetField = `${searchApiKeysField}.0.${providerGameNameField}`;

        it('should be required', async () => {

            const model = new GameModel(setSearchApiKeys());

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new GameModel(setSearchApiKeys(providerGameNameField, {}));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be shorter than or equal to 100 characters', async () => {

            const model = new GameModel(setSearchApiKeys(providerGameNameField, 'x'.repeat(101)));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });
    });
});

function setSearchApiKeys(field = '', value: any = {}): any {

    const key: any = {};

    if (field.length > 0) {

        key[field] = value;
    }

    return { [searchApiKeysField]: [key] };
}
