const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    customerComment: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    }
});

const Comment = model('comment', CommentSchema);
Comment.createIndexes();

module.exports = { Comment };