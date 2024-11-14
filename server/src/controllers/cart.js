const { Router } = require('express');

const { isUser } = require('../middlewares/guards');

const { parseError } = require('../util');
const {
  addLightToCart,
  updateUserCart,
  getUserCartLights,
  removeLightFromUserCart,
} = require('../services/cart');

const cartRouter = Router();

cartRouter.get('/lights/:lightsId', async (req, res) => {
  try {
    const lightsId = req.params.lightsId;
    const ligthsIdArr = lightsId.split(',');
    const result = await getUserCartLights(ligthsIdArr);

    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

cartRouter.put('/userCart/:lightsIds', async (req, res) => {
  let ligthsIdArr;
  try {
    const lightsIds = req.params.lightsIds;
    if (lightsIds == 'noLights') {
      ligthsIdArr = [];
    } else {
      ligthsIdArr = lightsIds.split(',');
    }
    const result = await updateUserCart(req.user._id, ligthsIdArr);

    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

cartRouter.put('/:lightId', isUser(), async (req, res) => {
  try {
    const lightId = req.params.lightId;
    const result = await addLightToCart(lightId, req.user._id);

    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});


cartRouter.delete('/:lightId', isUser(), async (req, res) => {
  try {
    const lightId = req.params.lightId;
    const result = await removeLightFromUserCart(lightId);

    res.json(result);
  } catch (err) {
    const parsed = parseError(err);
    res.status(400).json({ code: 400, message: parsed.message });
  }
});

module.exports = { cartRouter };
