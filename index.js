const express = require('express');
const mongoose = require('mongoose');
const aws = require('aws-sdk');
const logger = require('./utils/logger');
const bunyanRequest = require('bunyan-request');

const app = express();
const s3 = new aws.S3();

const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';

// Request logging
const requestLogger = bunyanRequest({ logger });
app.use(requestLogger);

// Health check
app.get('/', (req, res) => res.send());

// S3 connection test
app.get('/api/s3-test', (req, res) => {
  const params = { Bucket: 'boaty-faces', MaxKeys: 2 };
  s3.listObjectsV2(params, (err, data) => err ? res.send(err) : res.send(data));
});

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
