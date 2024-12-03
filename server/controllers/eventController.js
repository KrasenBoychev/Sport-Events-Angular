const { eventModel } = require('../models');
const { newPost } = require('./postController');

function getEvents(req, res, next) {
    eventModel.find()
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

function getSingleEvent(req, res, next) {
    const { eventId } = req.params;

    eventModel.findById(eventId)
        .populate('userId'
        //     {
        //     path : 'posts',
        //     populate : {
        //       path : 'userId'
        //     }
        //   }
        )
        .then(event => res.json(event))
        .catch(next);
}

function createEvent(req, res, next) {
    const { name, date, time, place, description } = req.body;
    const { _id: userId } = req.user;

    eventModel.create({ name, date, time, place, description, ownerId: userId })
        .then(
            event => {
        //     newPost(postText, userId, theme._id)
        //         .then(([_, updatedTheme]) => res.status(200).json(updatedTheme))
        // }

        res.status(200).json(event);
            }
    )
        .catch(next);
}

// function subscribe(req, res, next) {
//     const themeId = req.params.themeId;
//     const { _id: userId } = req.user;
//     themeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
//         .then(updatedTheme => {
//             res.status(200).json(updatedTheme)
//         })
//         .catch(next);
// }

module.exports = {
    getEvents,
    getSingleEvent,
    createEvent,
};
