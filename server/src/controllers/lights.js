const { Router } = require('express');
const validator = require('validator');
const { body, validationResult } = require('express-validator');

const { isUser } = require('../middlewares/guards');

const { validateLight } = require('./validateForms.js/validateLight');
const { parseError } = require('../util');

const {
  create,
  getLightById,
  getByOwnerId,
  getMarketplaceLights,
  update,
  decreaseQty,
  increaseQty,
  deleteById
} = require('../services/lights');

const lightsRouter = Router();

function adminId() {
  return '668cfe59f18d95a1f2f52a13';
}

lightsRouter.get('/catalog/:id', async (req, res) => {

  if (req.params.id !== adminId()) {
    res.status(404).json({ code: 404, message: 'No Catalog Lights at the moment' });
    return;
  }

  try {
    const data = await getByOwnerId(req.params.id);
    res.json(data);

  } catch (err) {
     const parsed = parseError(err);
     res.status(400).json({ code: 400, message: parsed.message });
  }
});

lightsRouter.get('/marketplace/:id', async (req, res) => {
  let userId = null;

  if (req.params.id !== 'noUser') {
    userId = req.params.id;
  }

  try {
    const data = await getMarketplaceLights(userId, adminId());
    res.json(data);

  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
 }
});

lightsRouter.get('/profile/:id', isUser(), async (req, res) => {
  try {
    const data = await getByOwnerId(req.params.id);
    res.json(data);

  } catch (err) {
     const parsed = parseError(err);
     res.status(400).json({ code: 400, message: parsed.message });
  }
});

lightsRouter.post(
  '/light',
  isUser(),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('price').trim().isNumeric().withMessage('Price should be a number'),
  body('date').trim().isDate().withMessage('Date is not valid'),
  body('quantities').trim().isInt().withMessage('Quantities should be an integer'),
  body('imageURL').trim().isString().notEmpty().withMessage('Image is required'),
  body('height').trim().isNumeric().withMessage('Height should be a number'),
  body('width').trim().isNumeric().withMessage('Width should be a number'),
  body('depth').trim().isNumeric().withMessage('Depth should be a number'),
  body('maxHeight').trim(),
  body('kelvins').trim(),
  body('lumens').trim(),
  body('watt').trim(),
  body('bulbtype').trim(),
  body('bulbsRequired').trim(),
  body('notes').trim(),
  async (req, res) => {
    try {
      const validation = validationResult(req);

      validateLight(req, validation);

      if (validation.errors.length) {
        throw validation.errors;
      }

      const result = await create(req.body, req.user._id);

      res.json(result);
    } catch (err) {
      const parsed = parseError(err);
      res.status(400).json({ code: 400, message: parsed.errors });
    }
  }
);

lightsRouter.get('/light/:id', async (req, res) => {

  if(!validator.isMongoId(req.params.id)){
    res.send('invalid id');
    return;
  }

  try {
    const record = await getLightById(req.params.id);
    res.json(record);

  } catch(err) {
    res.status(404).json({ code: 404, message: 'Item not found' });
  }
});

lightsRouter.put(
  '/light/:id',
  isUser(),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('price').trim().isNumeric().withMessage('Price should be a number'),
  body('date').trim().isDate().withMessage('Date is not valid'),
  body('quantities').trim().isInt().withMessage('Quantities should be an integer'),
  body('imageURL').trim().isString().notEmpty().withMessage('Image is required'),
  body('height').trim().isNumeric().withMessage('Height should be a number'),
  body('width').trim().isNumeric().withMessage('Width should be a number'),
  body('depth').trim().isNumeric().withMessage('Depth should be a number'),
  body('maxHeight').trim(),
  body('kelvins').trim(),
  body('lumens').trim(),
  body('watt').trim(),
  body('bulbtype').trim(),
  body('bulbsRequired').trim(),
  body('notes').trim(),
  async (req, res) => {
    try {
      const validation = validationResult(req);

      validateLight(req, validation);

      if (validation.errors.length) {
        throw validation.errors;
      }

      const result = await update(req.params.id, req.body, req.user._id);
      res.json(result);

    } catch (err) {
      const parsed = parseError(err);
      res.status(400).json({ code: 400, message: parsed.errors });
    }
  }
);

lightsRouter.post('/light/decreaseQty/:id', async (req, res) => {

  if(!validator.isMongoId(req.params.id)){
    res.send('invalid id');
    return;
  }

  try {
    const result = await decreaseQty(req.params.id);
    res.json(result);

  } catch(err) {
    res.status(404).json({ code: 404, message: 'Light quantities could not be updated' });
  }
});

lightsRouter.post('/light/increaseQty/:id', async (req, res) => {

  if(!validator.isMongoId(req.params.id)){
    res.send('invalid id');
    return;
  }

  try {
    const result = await increaseQty(req.params.id);
    res.json(result);

  } catch(err) {
    res.status(404).json({ code: 404, message: 'Light quantities could not be updated' });
  }
});

lightsRouter.delete('/light/:id', isUser(), async (req, res) => {
  try {
    await deleteById(req.params.id, req.user._id);
    res.status(204).end();

  } catch (err) {
    if (err.message == 'Access denied') {
      res.status(403).json({ code: 403, message: 'Access denied' });
    } else if (err instanceof ReferenceError) {
      res.status(404).json({ code: 404, message: 'Item not found' });
    } else {
      res.status(400).json({ code: 400, message: parseError(err).message });
    }
  }
});

module.exports = {
  lightsRouter,
  adminId
};
