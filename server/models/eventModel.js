const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true
    },
    place: {
      type: String,
      required: true,
    },
    usersJoined: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    ownerId: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Event", eventSchema);
