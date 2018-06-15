const express = require('express');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const bunyanRequest = require('bunyan-request');
const user = require('./utils/user');
const app = express();

const jill = { username: 'jill', password: '234234234', faceId: '23874928374234' };

user(jill).save();

const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';

// Request logging
app.use(bunyanRequest({ logger }));

// Health check
app.get('/', (req, res) => res.send());

// MongoDB connection test
app.get('/api/db-test', (req, res) => {
  mongoose.connect(`mongodb://${dbHost}/boaty`)
    .then(() => res.send('Connected'))
    .catch((error) => res.send(error));
});

// Error handler
app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  logger.error(error);
  res.status(500).send(error.stack);
});

app.listen(process.env.PORT || 3000);
