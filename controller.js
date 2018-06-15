const User = require('./user');

module.exports = {
  getUser: (id) => {
    return { id: id };
  },
  loginUser: () => {
    return true;
  },
  registerUser: ({image, userName, password}) => {    
    // create user in Mongo
    const user = new User({
      username: userName,
      password: password
    });

    user.save((err) => {
      if (err) throw err;
    });
    
    // with returned user, get ID and send image to S3

    // update Mongo with faceID

    return true;
  }
};
