const { userRouter } = require('../controllers/user');
const { lightsRouter } = require('../controllers/lights');
const { commentsRouter } = require('../controllers/comments');
const { cartRouter } = require('../controllers/cart');

function configRoutes(app) {
  app.use('/users', userRouter);
  // app.use('/data', lightsRouter);
  // app.use('/comments', commentsRouter);
  // app.use('/cart', cartRouter);
}

module.exports = { configRoutes };