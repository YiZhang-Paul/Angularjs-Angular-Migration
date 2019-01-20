import { expect } from 'chai';

import { getFieldString, verifyCastError, verifyCustomError, verifyValidationError } from '../../test-utilities/mongoose-test-utilities';

import AccountModel from './account-model';

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

            await verifyValidationError(model, idField, 'required');
        });

        it('should be a number', async () => {

            const model = new AccountModel({ [idField]: 'not_a_number' });

            await verifyCastError(model, idField);
        });

        it('should be an integer', async () => {

            const model = new AccountModel({ [idField]: '55.5' });
            const errorMessage = `${idField} must be an integer.`;

            await verifyCustomError(model, idField, errorMessage);
        });

        it('should be larger than or equal to 0', async () => {

            const model = new AccountModel({ [idField]: '-1' });

            await verifyValidationError(model, idField, 'min');
        });
    });

    describe(`${roleField}`, () => {

        it('should be required', async () => {

            const model = new AccountModel();

            await verifyValidationError(model, roleField, 'required');
        });

        it('should be a number', async () => {

            const model = new AccountModel({ [roleField]: 'not_a_number' });

            await verifyCastError(model, roleField);
        });

        it('should be an integer', async () => {

            const model = new AccountModel({ [roleField]: '55.5' });
            const errorMessage = `${roleField} must be an integer.`;

            await verifyCustomError(model, roleField, errorMessage);
        });
    });

    describe(`${usernameField}`, () => {

        it('should be required', async () => {

            const model = new AccountModel();

            await verifyValidationError(model, usernameField, 'required');
        });

        it('should be a string', async () => {

            const model = new AccountModel({ [usernameField]: {} });

            await verifyCastError(model, usernameField);
        });

        it('should be shorter than or equal to 60 characters', async () => {

            const model = new AccountModel({ [usernameField]: 'x'.repeat(61) });

            await verifyValidationError(model, usernameField, 'maxlength');
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

            await verifyCastError(model, passwordField);
        });

        it('should be shorter than or equal to 255 characters', async () => {

            const model = new AccountModel({ [passwordField]: 'x'.repeat(256) });

            await verifyValidationError(model, passwordField, 'maxlength');
        });
    });

    describe(`${emailField}`, () => {

        it('should be required', async () => {

            const model = new AccountModel();

            await verifyValidationError(model, emailField, 'required');
        });

        it('should be a string', async () => {

            const model = new AccountModel({ [emailField]: {} });

            await verifyCastError(model, emailField);
        });

        it('should be a valid email', async () => {

            const model = new AccountModel({ [emailField]: '.@invalid.email' });
            const errorMessage = `${emailField} must be a valid e-mail.`;

            await verifyCustomError(model, emailField, errorMessage);
        });
    });

    describe(`${oauthProviderField}`, () => {

        it('should be a string', async () => {

            const model = new AccountModel({ [oauthProviderField]: {} });

            await verifyCastError(model, oauthProviderField);
        });

        it('should be shorter than or equal to 80 characters', async () => {

            const model = new AccountModel({ [oauthProviderField]: 'x'.repeat(81) });

            await verifyValidationError(model, oauthProviderField, 'maxlength');
        });
    });

    describe(`${oauthIdentifierField}`, () => {

        it('should be a string', async () => {

            const model = new AccountModel({ [oauthIdentifierField]: {} });

            await verifyCastError(model, oauthIdentifierField);
        });

        it('should be shorter than or equal to 255 characters', async () => {

            const model = new AccountModel({ [oauthIdentifierField]: 'x'.repeat(256) });

            await verifyValidationError(model, oauthIdentifierField, 'maxlength');
        });
    });
});
