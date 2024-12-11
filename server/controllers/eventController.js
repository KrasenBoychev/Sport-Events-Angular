const { eventModel } = require("../models");
const { newPost } = require("./postController");

function getEvents(req, res, next) {
  eventModel
    .find()
    .populate("userId")
    .then((events) => res.json(events))
    .catch(next);
}

function userEvents(req, res, next) {
  const userId = req.params.userId;

  eventModel
    .find({ ownerId: userId })
    .populate("userId")
    .then((events) => res.json(events))
    .catch(next);
}

function getSingleEvent(req, res, next) {
  const { eventId } = req.params;

  eventModel
    .findById(eventId)
    .populate("userId")
    .then((event) => res.json(event))
    .catch(next);
}

function createEvent(req, res, next) {
  const { name, date, time, place, description } = req.body;
  const { _id: userId } = req.user;

  eventModel
    .create({ name, date, time, place, description, ownerId: userId })
    .then((event) => {
      res.status(200).json(event);
    })
    .catch(next);
}

function updateEvent(req, res, next) {
  const eventId = req.params.eventId;
  const { name, date, time, place, description } = req.body;

  eventModel
    .findOneAndUpdate(
      { _id: eventId },
      { name, date, time, place, description },
      { runValidators: true, new: true }
    )
    .then((updatedEvent) => {
      res.status(200).json(updatedEvent);
    })
    .catch(next);
}

function joinEvent(req, res, next) {
  const eventId = req.params.eventId;
  const { userId } = req.body;

  eventModel
    .findByIdAndUpdate(
      eventId,
      { $push: { usersJoined: userId } },
      { new: true }
    )
    .then((updatedEvent) => {
      res.status(200).json(updatedEvent);
    })
    .catch(next);
}

function cancelEvent(req, res, next) {
  const eventId = req.params.eventId;
  const { userId } = req.body;

  eventModel
    .findByIdAndUpdate(
      eventId,
      { $pull: { usersJoined: userId } },
      { new: true }
    )
    .then((updatedEvent) => {
      res.status(200).json(updatedEvent);
    })
    .catch(next);
}

function deleteEvent(req, res, next) {
  const eventId = req.params.eventId;

  eventModel
    .findByIdAndDelete(eventId)
    .then(() => {
      res.status(200).json();
    })
    .catch(next);
}

module.exports = {
  getEvents,
  userEvents,
  getSingleEvent,
  createEvent,
  joinEvent,
  cancelEvent,
  updateEvent,
  deleteEvent,
};
