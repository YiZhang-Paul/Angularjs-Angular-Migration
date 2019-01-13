import { model, Schema } from 'mongoose';

import Validator from '../../shared/models/validators';

const integerValidator = Validator.integerValidator;

const SearchApiKeysSchema = new Schema({

    provider_id: { type: Number, required: true, min: 0, validate: integerValidator },
    provider_game_id: { type: Number, required: true, min: 0, validate: integerValidator },
    provider_game_name: { type: String, required: true, maxlength: 100 }
});

const GameSchema = new Schema({

    id: { type: Number, required: true, min: 0, validate: integerValidator },
    name: { type: String, required: true, maxlength: 100 },
    search_api_keys: { type: [ SearchApiKeysSchema ], required: true },
    genre: { type: String, required: true, maxlength: 40 }
});

export default model('Game', GameSchema);
