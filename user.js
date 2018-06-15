const mongoose = require('mongoose');
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: String,
  faceId: String,
  password: String
}, { timestamps: true });

UserSchema.pre('save', (next) => {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
