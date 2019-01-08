import mongoose = require('mongoose');

const nameField = {

    type: String,
    minlength: 2,
    maxlength: 40,
    required: true
};

const gameSearchesField = [{

    game_id: { type: Number, required: true },
    count: { type: Number, min: 1, default: 1 }
}];

const schema = new mongoose.Schema({

    user_id: { type: Number, required: true },
    name: nameField,
    view_histories: { type: String, required: true },
    bookmarks: { type: String, required: true },
    keywords: [{

        date: { type: Date, default: new Date() },
        game_searches: gameSearchesField
    }]
});

export default mongoose.model('User', schema);
