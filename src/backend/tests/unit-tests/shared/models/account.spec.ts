import { expect } from 'chai';

import AccountModel from '../../../../shared/models/account';
import { getFieldString, getValidationError } from '../../../mongooseTestUtilities';

const idField = 'id';
const roleField = 'role';
const usernameField = 'username';
const passwordField = 'password';
const emailField = 'email';
const oauthProviderField = 'oauth_provider';
const oauthIdentifierField = 'oauth_identifier';

context('Account model unit test', () => {

    describe(`${idField}`, () => {

        it('should be required', async () => {

            const model = new AccountModel();

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new AccountModel({ [idField]: 'not_a_number' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new AccountModel({ [idField]: '55.5' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${idField} must be an integer.`);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new AccountModel({ [idField]: '-1' });

            const error = await getValidationError(model, idField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('min');
        });
    });

    describe(`${roleField}`, () => {

        it('should be required', async () => {

            const model = new AccountModel();

            const error = await getValidationError(model, roleField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a number', async () => {

            const model = new AccountModel({ [roleField]: 'not_a_number' });

            const error = await getValidationError(model, roleField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be an integer', async () => {

            const model = new AccountModel({ [roleField]: '55.5' });

            const error = await getValidationError(model, roleField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${roleField} must be an integer.`);
        });
    });

    describe(`${usernameField}`, () => {

        it('should be required', async () => {

            const model = new AccountModel();

            const error = await getValidationError(model, usernameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new AccountModel({ [usernameField]: {} });

            const error = await getValidationError(model, usernameField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be shorter than or equal to 60 characters', async () => {

            const model = new AccountModel({ [usernameField]: 'x'.repeat(61) });

            const error = await getValidationError(model, usernameField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });

        it('should be trimmed before validating', () => {

            const userInput = '    username    ';
            const model = new AccountModel({ [usernameField]: userInput });
            const expected = userInput.trim();

            const result = getFieldString(model, usernameField);

            expect(result).to.equal(expected);
        });

        it('should be sanitized before validating', async () => {

            const userInput = 'user<script src="malicious"></script>name{ "$gte": "" }';
            const model = new AccountModel({ [usernameField]: userInput });
            const expected = 'username "gte": ""';
            // trigger validation and mute errors
            await model.validate(_ => null);
            // sanitization should be applied by now
            const result = getFieldString(model, usernameField);

            expect(result).to.equal(expected);
        });
    });

    describe(`${passwordField}`, () => {

        it('should be a string', async () => {

            const model = new AccountModel({ [passwordField]: {} });

            const error = await getValidationError(model, passwordField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be shorter than or equal to 255 characters', async () => {

            const model = new AccountModel({ [passwordField]: 'x'.repeat(256) });

            const error = await getValidationError(model, passwordField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });
    });

    describe(`${emailField}`, () => {

        it('should be required', async () => {

            const model = new AccountModel();

            const error = await getValidationError(model, emailField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('required');
        });

        it('should be a string', async () => {

            const model = new AccountModel({ [emailField]: {} });

            const error = await getValidationError(model, emailField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be a valid email', async () => {

            const model = new AccountModel({ [emailField]: '.@invalid.email' });

            const error = await getValidationError(model, emailField);

            expect(error).is.not.null;
            expect(error.message).to.equal(`${emailField} must be a valid e-mail.`);
        });
    });

    describe(`${oauthProviderField}`, () => {

        it('should be a string', async () => {

            const model = new AccountModel({ [oauthProviderField]: {} });

            const error = await getValidationError(model, oauthProviderField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be shorter than or equal to 80 characters', async () => {

            const model = new AccountModel({ [oauthProviderField]: 'x'.repeat(81) });

            const error = await getValidationError(model, oauthProviderField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });
    });

    describe(`${oauthIdentifierField}`, () => {

        it('should be a string', async () => {

            const model = new AccountModel({ [oauthIdentifierField]: {} });

            const error = await getValidationError(model, oauthIdentifierField);

            expect(error).is.not.null;
            expect(error.name).to.equal('CastError');
        });

        it('should be shorter than or equal to 255 characters', async () => {

            const model = new AccountModel({ [oauthIdentifierField]: 'x'.repeat(256) });

            const error = await getValidationError(model, oauthIdentifierField);

            expect(error).is.not.null;
            expect(error.kind).to.equal('maxlength');
        });
    });
});
