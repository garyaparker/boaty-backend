const express = require('express');
const mongoose = require('mongoose');
const aws = require('aws-sdk');

const app = express();
const s3 = new aws.S3();

const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';

// Health check
app.get('/', (req, res) => res.send());

// S3 connection test
app.get('/api/faces', (req, res) => {
  const params = { Bucket: 'boaty-faces', MaxKeys: 2 };
  s3.listObjectsV2(params, (err, data) => err ? res.send(err) : res.send(data));
});

// MongoDB connection test
app.use((req, res) => {
  mongoose.connect(`mongodb://${dbHost}/boaty`)
    .then(() => res.send('Connected'))
    .catch((error) => res.send(error));
});

app.listen(process.env.PORT || 3000);
