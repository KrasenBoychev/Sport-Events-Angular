const { Schema, model, Types } = require('mongoose');

const LightSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    quantities: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    maxHeight: {
        type: Number
    },
    width: {
        type: Number,
        required: true
    },
    depth: {
        type: Number,
        required: true
    },
    kelvins: {
        type: Number
    },
    lumens: {
        type: Number
    },
    watt: {
        type: Number
    },
    bulbType: {
        type: String
    },
    bulbsRequired: {
        type: Number
    },
    notes: {
        type: String
    },
    imageURL: {
        type: String,
        required: true
    },
    ownerId: {
        type: Types.ObjectId,
        ref: 'User',
      },
});
const Light = model('lights', LightSchema);
Light.createIndexes();

module.exports = { Light };