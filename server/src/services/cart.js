const { Light } = require('../models/Event');
const { User } = require('../models/User');

async function getUserCartLights(lightsId) {
  return Light.find({ _id: { $in: lightsId } }).lean();
}

async function updateUserCart(userId, lightsIds) {
  const result = await User.findOneAndUpdate({ _id: userId }, { $set: { cart: lightsIds } }, {new: true});

  return result;
}

async function addLightToCart(lightId, userId) {
  const user = await User.findById(userId);

  if (!user) {
    throw new ReferenceError('Record not found ' + userId);
  }

  user.cart.push(lightId);

  await user.save();

  return user;
}

async function removeLightFromUserCart(lightId) {
  await User.updateMany({}, { $pull: { cart: { $in: [lightId] } } });
}

module.exports = {
  addLightToCart,
  updateUserCart,
  getUserCartLights,
  removeLightFromUserCart,
};
