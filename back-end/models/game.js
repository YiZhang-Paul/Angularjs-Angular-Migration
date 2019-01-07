const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    game_id: Number,
    name: String,
    genre: String,
    search_api_keys:
    [{
        provider_id: Number,
        provider_game_id: Number,
        provider_game_name: String
    }]
});

module.exports = mongoose.model('Game', schema);

// provider_id
// provider_game_id
// provider_game_name
