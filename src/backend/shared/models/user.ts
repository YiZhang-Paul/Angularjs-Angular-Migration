import mongoose = require('mongoose');

import { isInteger, isUrl } from '../../shared/models/validators';

const integerValidator = {

    validator: isInteger,
    message: '{PATH} must be an integer.'
};

const urlValidator = {

    validator: isUrl,
    message: '{PATH} must be a valid URI.'
};

const nameField = {

    type: String,
    minlength: 4,
    maxlength: 40,
    required: true
};

const gameSearchField = [{

    game_id: { type: Number, min: 0, required: true, validate: integerValidator },
    count: { type: Number, min: 1, default: 1, validate: integerValidator }
}];

const schema = new mongoose.Schema({

    user_id: { type: Number, min: 0, required: true, validate: integerValidator },
    name: nameField,
    view_histories: { type: String, required: true, validate: urlValidator },
    bookmarks: { type: String, required: true, validate: urlValidator },
    keywords: [{

        date: { type: Date, default: new Date(), required: true },
        game_search: gameSearchField
    }]
});

export default mongoose.model('User', schema);
