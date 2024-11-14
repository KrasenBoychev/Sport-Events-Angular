const { Comment } = require('../models/Comment');

async function getNewest() {
  return Comment.find().sort({$natural:-1}).limit(8);
}

async function createComment(data) {
  const record = new Comment({
    name: data.name,
    customerComment: data.customerComment,
    imageURL: data.downloadURL,
  });

  await record.save();

  return record;
}


module.exports = {
    getNewest,
    createComment
};
