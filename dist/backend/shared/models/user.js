"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var nameField = {
    type: String,
    minlength: 2,
    maxlength: 40,
    required: true
};
var gameSearchesField = [{
        game_id: { type: Number, required: true },
        count: { type: Number, min: 1, default: 1 }
    }];
var schema = new mongoose.Schema({
    user_id: { type: Number, required: true },
    name: nameField,
    view_histories: { type: String, required: true },
    bookmarks: { type: String, required: true },
    keywords: [{
            date: { type: Date, default: new Date() },
            game_searches: gameSearchesField
        }]
});
exports.default = mongoose.model('User', schema);
//# sourceMappingURL=user.js.map