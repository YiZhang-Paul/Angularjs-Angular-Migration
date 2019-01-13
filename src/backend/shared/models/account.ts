import { model, Schema } from 'mongoose';

import Validator from '../../shared/models/validators';

const integerValidator = Validator.integerValidator;

const AccountSchema = new Schema({

    id: { type: Number, required: true, min: 0, validate: integerValidator },
    role: { type: Number, required: true, validate: integerValidator },
    username: {},
    password: {},
    email: { type: String, required: true },
    oauth_provider: { type: String, required: true, maxlength: 80 },
    oauth_identifier: {}
});

export default model('Account', AccountSchema);
