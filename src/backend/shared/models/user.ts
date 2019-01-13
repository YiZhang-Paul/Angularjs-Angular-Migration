import { model, Schema } from 'mongoose';

import Validator from '../../shared/models/validators';

const integerValidator = Validator.integerValidator;
const nonEmptyArrayValidator = Validator.nonEmptyArrayValidator;
const urlValidator = Validator.urlValidator;

const GameSearchSchema = new Schema({

    game_id: { type: Number, required: true, min: 0, validate: integerValidator },
    count: { type: Number, default: 1, min: 1, validate: integerValidator }
});

const KeywordSchema = new Schema({

    date: { type: Date, default: new Date() },
    game_search: { type: [ GameSearchSchema ], validate: nonEmptyArrayValidator }
});

const UserSchema = new Schema({

    id: { type: Number, required: true, min: 0, validate: integerValidator },
    name: { type: String, required: true, minlength: 4, maxlength: 40 },
    view_histories: { type: String, required: true, validate: urlValidator },
    bookmarks: { type: String, required: true, validate: urlValidator },
    keywords: [ KeywordSchema ]
});

export default model('User', UserSchema);
