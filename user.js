const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  faceId: String
}, { timestamps: true });

mongoose.model('User', UserSchema);
