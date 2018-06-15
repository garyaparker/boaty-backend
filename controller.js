const User = require('./utils/user');
const logger = require('./utils/logger');
// const userSchema = require('./user');
// const mongoose = require('mongoose');
// // const User = userSchema.model;
// const User = mongoose.model('User', userSchema);

module.exports = {
  getUser: (id) => {
    return { id: id };
  },
  loginUser: () => {
    return true;
  },
  registerUser: ({ image, userName, password }) => {

    logger.info('registering user');

    // create user in Mongo
    User({
      username: userName,
      password: password
    }).save((err) => {
      if (err) throw err;
    });
    // with returned user, get ID and send image to S3

    // update Mongo with faceID

    return true;
  }
};
