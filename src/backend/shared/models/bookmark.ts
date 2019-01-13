import { model, Schema } from 'mongoose';

import validator from '../../shared/models/validators';

const integerValidator = validator.integerValidator;

const BookmarkSchema = new Schema({

    id: { type: Number, required: true, min: 0, validate: integerValidator },
    channel_id: { type: Number, required: true, min: 0, validate: integerValidator },
    title: { type: String, maxlength: 150 },
    streamer_name: { type: String, maxlength: 50 }
});

export default model('Bookmark', BookmarkSchema);
