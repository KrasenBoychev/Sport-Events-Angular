const { Schema, model, Types } = require('mongoose');

const SportEventSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    ownerId: {
        type: Types.ObjectId,
        ref: 'User',
      },
});
const SportEvent = model('lights', SportEventSchema);
SportEvent.createIndexes();

module.exports = { SportEvent };