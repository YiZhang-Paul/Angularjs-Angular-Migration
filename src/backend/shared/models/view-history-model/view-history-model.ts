import { model, Schema } from 'mongoose';

import validator from '../../services/validator/validators';

const integerValidator = validator.integerValidator;
const urlValidator = validator.urlValidator;

const ViewHistorySchema = new Schema({

    id: { type: Number, required: true, min: 0, validate: integerValidator },
    user_id: { type: Number, required: true, min: 0, validate: integerValidator },
    channel_id: { type: Number, required: true, min: 0, validate: integerValidator },
    title: { type: String, maxlength: 150 },
    streamer_name: { type: String, maxlength: 50 },
    game_id: { type: Number, required: true, min: 0, validate: integerValidator },
    game_name: { type: String, required: true, maxlength: 100 },
    image: { type: String, required: true, validate: urlValidator },
    timestamp: { type: Date, default: new Date() }
});

export default model('ViewHistory', ViewHistorySchema);
