//const { adminId } = require('../../../client/api/requester');
const { Light } = require('../models/Light');

async function getAll() {
  return Light.find().lean();
}

async function getByOwnerId(id) {
  return Light.find({ ownerId: id }).lean();
}

async function getMarketplaceLights(userId, adminId) {
  if (userId) {
    return Light.find({
      ownerId: { $nin: [adminId, userId] },
    });
  } else {
    return Light.find({ ownerId: { $ne: adminId } });
  }
}

async function getLightById(id) {
    return Light.findById(id).lean();
}

async function create(data, ownerId) {
  const existing = await Light.findOne({ name: data.name });

  if (existing) {
    throw new Error(`'${data.name}' name is already in use`);
  }

  const record = new Light({
    name: data.name,
    price: Number(data.price).toFixed(2),
    date: data.date,
    quantities: Math.floor(Number(data.quantities)),
    imageURL: data.downloadURL,
    height: Number(data.height).toFixed(2),
    width: Number(data.width).toFixed(2),
    depth: Number(data.depth).toFixed(2)
  });

  if (data.maxHeight) {
    record.maxHeight = Number(data.maxHeight).toFixed(2);
  }

  if (data.kelvins) {
    record.kelvins = Math.floor(Number(data.kelvins));
    record.lumens = Math.floor(Number(data.lumens));
    record.watt = Math.floor(Number(data.watt));
  } else {
    record.bulbType = data.bulbType;
    record.bulbsRequired = Math.floor(Number(data.bulbsRequired));
  }

  if (data.notes) {
    record.notes = data.notes;
  }

  record.ownerId = ownerId;

  await record.save();

  return record;
}

async function update(id, data, userId) {
  const record = await Light.findById(id);

  if (!record) {
    throw new ReferenceError('Record not found ' + id);
  }

  if (record.ownerId.toString() != userId) {
    throw new Error('Access denied');
  }

  record.name = data.name;
  record.price = Number(data.price).toFixed(2);
  record.date = data.date;
  record.quantities = Math.floor(Number(data.quantities));
  record.imageURL = data.downloadURL;
  record.height = Number(data.height).toFixed(2);
  record.width = Number(data.width).toFixed(2);
  record.depth = Number(data.depth).toFixed(2);

  if (Number(data.maxHeight)) {
    record.maxHeight = Number(data.maxHeight).toFixed(2);
  } else {
    record.maxHeight = data.maxHeight;
  }

  if (Number(data.kelvins)) {
    record.kelvins = Math.floor(Number(data.kelvins));
    record.lumens = Math.floor(Number(data.lumens));
    record.watt = Math.floor(Number(data.watt));
  } else {
    record.kelvins = data.kelvins;
    record.lumens = data.lumens;
    record.watt = data.watt;
  }

  if (Number(data.bulbsRequired)) {
    record.bulbsRequired = Math.floor(Number(data.bulbsRequired));
  } else {
    record.bulbsRequired = data.bulbsRequired;
  }
  
  record.bulbType = data.bulbType;
  record.notes = data.notes;

  await record.save();

  return record;
}

async function decreaseQty(lightId) {
  const record = await Light.findOneAndUpdate({ _id: lightId }, { $inc: { quantities: -1 } });

  return record;
}

async function increaseQty(lightId) {
  const record = await Light.findOneAndUpdate({ _id: lightId }, { $inc: { quantities: 1 } });

  return record;
}

async function deleteById(id, userId) {
  const record = await Light.findById(id);

  if (!record) {
    throw new ReferenceError('Record not found ' + id);
  }

  if (record.ownerId.toString() != userId) {
    throw new Error('Access denied');
  }

  await Light.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  getLightById,
  create,
  update,
  deleteById,
  getByOwnerId,
  getMarketplaceLights,
  decreaseQty,
  increaseQty
};
