import { model, Schema } from 'mongoose';

import Validator from '../../shared/models/validators';

const integerValidator = Validator.integerValidator;

const ChannelSchema = new Schema({

    id: { type: Number, required: true, min: 0, validate: integerValidator },
    provider_id: { type: Number, required: true, min: 0, validate: integerValidator },
    provider_channel_id: { type: Number, required: true, min: 0, validate: integerValidator }
});

export default model('Channel', ChannelSchema);
