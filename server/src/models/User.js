const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    events: { 
        type: [ Types.ObjectId ], 
        ref: 'Event' 
    }
});
const User = model('users', UserSchema);
User.createIndexes();

module.exports = { User };