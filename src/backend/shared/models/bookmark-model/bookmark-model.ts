import { model, Schema } from 'mongoose';

import validator from '../../services/validator/validators';

const integerValidator = validator.integerValidator;
const urlValidator = validator.urlValidator;

const BookmarkSchema = new Schema({

    id: { type: Number, required: true, min: 0, validate: integerValidator },
    user_id: { type: Number, required: true, min: 0, validate: integerValidator },
    provider_id: { type: Number, required: true, min: 0, validate: integerValidator },
    provider_channel_id: { type: Number, required: true, min: 0, validate: integerValidator },
    channel_id: { type: Number, required: true, min: 0, validate: integerValidator },
    title: { type: String, maxlength: 150 },
    streamer_name: { type: String, maxlength: 50 },
    image: { type: String, validate: urlValidator },
    banner: { type: String, validate: urlValidator }
});

export default model('Bookmark', BookmarkSchema);
