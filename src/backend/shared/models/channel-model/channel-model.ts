import { model, Schema } from 'mongoose';

import validator from '../../services/validator/validators';

const integerValidator = validator.integerValidator;

const ChannelSchema = new Schema({

    id: { type: Number, required: true, min: 0, validate: integerValidator },
    provider_id: { type: Number, required: true, min: 0, validate: integerValidator },
    provider_channel_id: { type: Number, required: true, min: 0, validate: integerValidator }
});

export default model('Channel', ChannelSchema);
