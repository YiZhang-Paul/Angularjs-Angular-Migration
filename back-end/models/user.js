const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    user_id: Number,
    role: Number,
    name: String,
    password: String,
    email: String,
    oauth_provider: String,
    oauth_identifier: String,
    view_histories: String,
    bookmarks: String,
    keywords: Array
});

module.exports = mongoose.model('User', schema);
