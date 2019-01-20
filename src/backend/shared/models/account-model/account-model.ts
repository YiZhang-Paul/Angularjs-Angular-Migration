import { model, Schema } from 'mongoose';

import sanitizer from '../../services/sanitizer/sanitizers';
import validator from '../../services/validator/validators';

const integerValidator = validator.integerValidator;
const emailValidator = validator.emailValidator;
const usernameField = 'username';

const AccountSchema = new Schema({

    id: { type: Number, required: true, min: 0, validate: integerValidator },
    role: { type: Number, required: true, validate: integerValidator },
    [usernameField]: { type: String, required: true, maxlength: 60, trim: true },
    password: { type: String, maxlength: 255 },
    email: { type: String, required: true, validate: emailValidator },
    oauth_provider: { type: String, maxlength: 80 },
    oauth_identifier: { type: String, maxlength: 255 }
});

AccountSchema.pre('validate', function (next) {

    const self: any = this;

    if (self[usernameField]) {

        self[usernameField] = sanitizer.sanitize(self[usernameField]);
    }

    next();
});

export default model('Account', AccountSchema);
