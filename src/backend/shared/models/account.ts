import { model, Schema } from 'mongoose';

import validator from '../../shared/models/validators';

const integerValidator = validator.integerValidator;
const emailValidator = validator.emailValidator;

const AccountSchema = new Schema({

    id: { type: Number, required: true, min: 0, validate: integerValidator },
    role: { type: Number, required: true, validate: integerValidator },
    username: { type: String, required: true, maxlength: 60, trim: true },
    password: { type: String, required: true, maxlength: 255 },
    email: { type: String, required: true, validate: emailValidator },
    oauth_provider: { type: String, required: true, maxlength: 80 },
    oauth_identifier: { type: String, required: true, maxlength: 255 }
});

export default model('Account', AccountSchema);
