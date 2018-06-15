const User = require('./utils/user');
const logger = require('./utils/logger');
const essThree = require('./utils/s3');
const { detectFace } = require('./utils/face');

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
    logger.info('userName:' + userName);
    logger.info('password:' + password);

    // create user in Mongo
    User({
      username: userName,
      password: password
    }).save().then((user) => {
      const userId = user._id;
      let fileName = image.originalname;
      const upload = Buffer.from(image.buffer);
      essThree.putObject(fileName, upload).then(() => {
        detectFace(`https://s3.amazonaws.com/boaty-faces/${fileName}`);
      }).catch((err) => {
        logger.error(err);
      });
    });
    // with returned user, get ID and send image to S3

    // update Mongo with faceID

    return true;
  }
};
