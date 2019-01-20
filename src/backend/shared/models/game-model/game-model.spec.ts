import { verifyCastError, verifyCustomError, verifyValidationError } from '../../test-utilities/mongoose-test-utilities';

import GameModel from './game-model';

const idField = 'id';
const nameField = 'name';
const searchApiKeysField = 'search_api_keys';
const providerIdField = 'provider_id';
const providerGameIdField = 'provider_game_id';
const providerGameNameField = 'provider_game_name';

context('Game model unit test', () => {

    describe(`${idField}`, () => {

        it('should be required', async () => {

            const model = new GameModel();

            await verifyValidationError(model, idField, 'required');
        });

        it('should be a number', async () => {

            const model = new GameModel({ [idField]: 'not_a_number' });

            await verifyCastError(model, idField);
        });

        it('should be an integer', async () => {

            const model = new GameModel({ [idField]: '55.5' });
            const errorMessage = `${idField} must be an integer.`;

            await verifyCustomError(model, idField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new GameModel({ [idField]: '-1' });

            await verifyValidationError(model, idField, 'min');
        });
    });

    describe(`${nameField}`, () => {

        it('should be required', async () => {

            const model = new GameModel();

            await verifyValidationError(model, nameField, 'required');
        });

        it('should be a string', async () => {

            const model = new GameModel({ [nameField]: {} });

            await verifyCastError(model, nameField);
        });

        it('should be shorter than or equal to 100 characters', async () => {

            const model = new GameModel({ [nameField]: 'x'.repeat(101) });

            await verifyValidationError(model, nameField, 'maxlength');
        });
    });

    describe(`${searchApiKeysField}`, () => {

        it('should be non-empty', async () => {

            const model = new GameModel();
            const errorMessage = `${searchApiKeysField} must be non-empty.`;

            await verifyCustomError(model, searchApiKeysField, errorMessage);
        });
    });

    describe(`${searchApiKeysField}::${providerIdField}`, () => {
        // equivalent to <model>.search_api_keys[0].provider_id
        const targetField = `${searchApiKeysField}.0.${providerIdField}`;

        it('should be required', async () => {

            const model = new GameModel(setSearchApiKeys());

            await verifyValidationError(model, targetField, 'required');
        });

        it('should be a number', async () => {

            const model = new GameModel(setSearchApiKeys(providerIdField, 'not_a_number'));

            await verifyCastError(model, targetField);
        });

        it('should be an integer', async () => {

            const model = new GameModel(setSearchApiKeys(providerIdField, '55.5'));
            const errorMessage = `${providerIdField} must be an integer.`;

            await verifyCustomError(model, targetField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new GameModel(setSearchApiKeys(providerIdField, '-1'));

            await verifyValidationError(model, targetField, 'min');
        });
    });

    describe(`${searchApiKeysField}::${providerGameIdField}`, () => {
        // equivalent to <model>.search_api_keys[0].provider_game_id
        const targetField = `${searchApiKeysField}.0.${providerGameIdField}`;

        it('should be required', async () => {

            const model = new GameModel(setSearchApiKeys());

            await verifyValidationError(model, targetField, 'required');
        });

        it('should be a number', async () => {

            const model = new GameModel(setSearchApiKeys(providerGameIdField, 'not_a_number'));

            await verifyCastError(model, targetField);
        });

        it('should be an integer', async () => {

            const model = new GameModel(setSearchApiKeys(providerGameIdField, '55.5'));
            const errorMessage = `${providerGameIdField} must be an integer.`;

            await verifyCustomError(model, targetField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new GameModel(setSearchApiKeys(providerGameIdField, '-1'));

            await verifyValidationError(model, targetField, 'min');
        });
    });

    describe(`${searchApiKeysField}::${providerGameNameField}`, () => {
        // equivalent to <model>.search_api_keys[0].provider_game_name
        const targetField = `${searchApiKeysField}.0.${providerGameNameField}`;

        it('should be required', async () => {

            const model = new GameModel(setSearchApiKeys());

            await verifyValidationError(model, targetField, 'required');
        });

        it('should be a string', async () => {

            const model = new GameModel(setSearchApiKeys(providerGameNameField, {}));

            await verifyCastError(model, targetField);
        });

        it('should be shorter than or equal to 100 characters', async () => {

            const model = new GameModel(setSearchApiKeys(providerGameNameField, 'x'.repeat(101)));

            await verifyValidationError(model, targetField, 'maxlength');
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
