const express = require('express');
const mongoose = require('mongoose');

const app = express();

const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';

app.use((req, res) => {
  mongoose.connect(`mongodb://${dbHost}/boaty`)
    .then(() => res.send('Connected'))
    .catch((error) => res.send(error));
});

app.listen(process.env.PORT || 3000);
