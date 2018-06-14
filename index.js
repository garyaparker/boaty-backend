const express = require('express');
const mongoose = require('mongoose');

const app = express();

const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';

mongoose.connect(`mongodb://${dbHost}/boaty`)
  .then(() => console.log(`Connected to database ${dbHost}`))
  .catch(console.error);

app.use((req, res) => res.send('hello boats'));
app.listen(process.env.PORT || 3000);
