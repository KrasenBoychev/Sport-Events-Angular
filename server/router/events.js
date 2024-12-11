const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { eventController } = require('../controllers');

// middleware that is specific to this router

router.get('/', eventController.getEvents);
router.post('/', auth(), eventController.createEvent);

router.get('/user/:userId', eventController.userEvents);

router.get('/:eventId', eventController.getSingleEvent);
router.put('/update/:eventId', eventController.updateEvent);
router.delete('/delete/:eventId', eventController.deleteEvent);

router.put('/join/:eventId', eventController.joinEvent);
router.put('/cancel/:eventId', eventController.cancelEvent);

// router.post('/:themeId', auth(), postController.createPost);
// router.put('/:themeId', auth(), themeController.subscribe);
// router.put('/:themeId/posts/:postId', auth(), postController.editPost);
// router.delete('/:themeId/posts/:postId', auth(), postController.deletePost);

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router;