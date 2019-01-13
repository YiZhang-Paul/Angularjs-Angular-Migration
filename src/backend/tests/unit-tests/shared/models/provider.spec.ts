import { expect } from 'chai';

import { getValidationError } from '../../../mongooseTestUtilities';
import ProviderModel from '../../../../shared/models/provider';

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

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new ProviderModel({ [idField]: 'not_a_number' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new ProviderModel({ [idField]: '55.5' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${idField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new ProviderModel({ [idField]: '-1' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe(`${nameField}`, () => {

        it('should be required', async () => {

            const model = new ProviderModel();

            const error = await getValidationError(model, nameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new ProviderModel({ [nameField]: {} });

            const error = await getValidationError(model, nameField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be longer than or equal to 3 characters', async () => {

            const model = new ProviderModel({ [nameField]: 'x'.repeat(2) });

            const error = await getValidationError(model, nameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('minlength');
        });

        it('should be shorter than or equal to 50 characters', async () => {

            const model = new ProviderModel({ [nameField]: 'x'.repeat(51) });

            const error = await getValidationError(model, nameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });
    });

    describe(`${urlsField}`, () => {

        it('should be required', async () => {

            const model = new ProviderModel();

            const error = await getValidationError(model, urlsField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });
    });

    describe(`${urlsField}::${siteUrlField}`, () => {

        const targetField = `${urlsField}.${siteUrlField}`;

        it('should be required', async () => {

            const model = new ProviderModel(setUrls());

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new ProviderModel(setUrls(siteUrlField, {}));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be a valid url', async () => {

            const model = new ProviderModel(setUrls(siteUrlField, 'not_a_url'));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${siteUrlField} must be a valid URI.`);
        });
    });

    describe(`${urlsField}::${searchGameUrl}`, () => {

        const targetField = `${urlsField}.${searchGameUrl}`;

        it('should be required', async () => {

            const model = new ProviderModel(setUrls());

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new ProviderModel(setUrls(searchGameUrl, {}));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be a valid url', async () => {

            const model = new ProviderModel(setUrls(searchGameUrl, 'not_a_url'));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${searchGameUrl} must be a valid URI.`);
        });
    });

    describe(`${urlsField}::${searchChannelUrl}`, () => {

        const targetField = `${urlsField}.${searchChannelUrl}`;

        it('should be required', async () => {

            const model = new ProviderModel(setUrls());

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new ProviderModel(setUrls(searchChannelUrl, {}));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be a valid url', async () => {

            const model = new ProviderModel(setUrls(searchChannelUrl, 'not_a_url'));

            const error = await getValidationError(model, targetField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${searchChannelUrl} must be a valid URI.`);
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
