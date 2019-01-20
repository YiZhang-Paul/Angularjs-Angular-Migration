import { model, Schema } from 'mongoose';

import validator from '../../services/validator/validators';

const integerValidator = validator.integerValidator;
const urlValidator = validator.urlValidator;

const UrlSchema = new Schema({

    site_url: { type: String, required: true, validate: urlValidator },
    search_game_url: { type: String, required: true, validate: urlValidator },
    search_channel_url: { type: String, required: true, validate: urlValidator }
});

const ProviderSchema = new Schema({

    id: { type: Number, required: true, min: 0, validate: integerValidator },
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    urls: { type: UrlSchema, required: true }
});

export default model('Provider', ProviderSchema);
