const mongoose = require('mongoose');

const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';

mongoose.connect(`mongodb://${dbHost}/boaty`);

const schema = new mongoose.Schema({
  username: String,
  password: String,
  faceId: String
});

module.exports = mongoose.model('User', schema);
