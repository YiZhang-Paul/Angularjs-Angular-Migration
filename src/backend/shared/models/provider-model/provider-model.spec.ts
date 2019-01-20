import { verifyCastError, verifyCustomError, verifyValidationError } from '../../test-utilities/mongoose-test-utilities';

import ProviderModel from './provider-model';

const idField = 'id';
const nameField = 'name';
const urlsField = 'urls';
const siteUrlField = 'site_url';
const searchGameUrl = 'search_game_url';
const searchChannelUrl = 'search_channel_url';

context('Provider model unit test', () => {

    describe(`${idField}`, () => {

        it('should be required', async () => {

            const model = new ProviderModel();

            await verifyValidationError(model, idField, 'required');
        });

        it('should be a number', async () => {

            const model = new ProviderModel({ [idField]: 'not_a_number' });

            await verifyCastError(model, idField);
        });

        it('should be an integer', async () => {

            const model = new ProviderModel({ [idField]: '55.5' });
            const errorMessage = `${idField} must be an integer.`;

            await verifyCustomError(model, idField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new ProviderModel({ [idField]: '-1' });

            await verifyValidationError(model, idField, 'min');
        });
    });

    describe(`${nameField}`, () => {

        it('should be required', async () => {

            const model = new ProviderModel();

            await verifyValidationError(model, nameField, 'required');
        });

        it('should be a string', async () => {

            const model = new ProviderModel({ [nameField]: {} });

            await verifyCastError(model, nameField);
        });

        it('should be longer than or equal to 3 characters', async () => {

            const model = new ProviderModel({ [nameField]: 'x'.repeat(2) });

            await verifyValidationError(model, nameField, 'minlength');
        });

        it('should be shorter than or equal to 50 characters', async () => {

            const model = new ProviderModel({ [nameField]: 'x'.repeat(51) });

            await verifyValidationError(model, nameField, 'maxlength');
        });
    });

    describe(`${urlsField}`, () => {

        it('should be required', async () => {

            const model = new ProviderModel();

            await verifyValidationError(model, urlsField, 'required');
        });
    });

    describe(`${urlsField}::${siteUrlField}`, () => {

        const targetField = `${urlsField}.${siteUrlField}`;

        it('should be required', async () => {

            const model = new ProviderModel(setUrls());

            await verifyValidationError(model, targetField, 'required');
        });

        it('should be a string', async () => {

            const model = new ProviderModel(setUrls(siteUrlField, {}));

            await verifyCastError(model, targetField);
        });

        it('should be a valid url', async () => {

            const model = new ProviderModel(setUrls(siteUrlField, 'not_a_url'));
            const errorMessage = `${siteUrlField} must be a valid URI.`;

            await verifyCustomError(model, targetField, errorMessage);
        });
    });

    describe(`${urlsField}::${searchGameUrl}`, () => {

        const targetField = `${urlsField}.${searchGameUrl}`;

        it('should be required', async () => {

            const model = new ProviderModel(setUrls());

            await verifyValidationError(model, targetField, 'required');
        });

        it('should be a string', async () => {

            const model = new ProviderModel(setUrls(searchGameUrl, {}));

            await verifyCastError(model, targetField);
        });

        it('should be a valid url', async () => {

            const model = new ProviderModel(setUrls(searchGameUrl, 'not_a_url'));
            const errorMessage = `${searchGameUrl} must be a valid URI.`;

            await verifyCustomError(model, targetField, errorMessage);
        });
    });

    describe(`${urlsField}::${searchChannelUrl}`, () => {

        const targetField = `${urlsField}.${searchChannelUrl}`;

        it('should be required', async () => {

            const model = new ProviderModel(setUrls());

            await verifyValidationError(model, targetField, 'required');
        });

        it('should be a string', async () => {

            const model = new ProviderModel(setUrls(searchChannelUrl, {}));

            await verifyCastError(model, targetField);
        });

        it('should be a valid url', async () => {

            const model = new ProviderModel(setUrls(searchChannelUrl, 'not_a_url'));
            const errorMessage = `${searchChannelUrl} must be a valid URI.`;

            await verifyCustomError(model, targetField, errorMessage);
        });
    });
});

function setUrls(field = '', value: any = ''): any {

    const urls: any = {};

    if (field.length > 0) {

        urls[field] = value;
    }

    return { [urlsField]: urls };
}
