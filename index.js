const express = require('express');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const bunyanRequest = require('bunyan-request');
const user = require('./utils/user');
const bodyParser = require('body-parser');
const controller = require('./controller');

const app = express();

const jill = { username: 'jill', password: '234234234', faceId: '23874928374234' };

user(jill).save();

const dbHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';


// Request logging
app.use(bunyanRequest({ logger }));

// Health check
// app.get('/', (req, res) => res.send());

// MongoDB connection test
app.get('/api/db-test', (req, res) => {
  mongoose.connect(`mongodb://${dbHost}/boaty`)
    .then(() => res.send('Connected'))
    .catch((error) => res.send(error));
});

const jsonParser = bodyParser.json();

const router = express.Router();
router.post('/register', jsonParser, (req, res) => {
  console.log(req.body);

  // from body get image
  // username
  // password
  if (controller.registerUser()) {
    res.status(201).send();
  }
});

router.get('/login', (req, res) => {
  console.log('login');
  const login = controller.loginUser();
  if (login) {
    // generate JWT
    // add JWT to response
    res.status(200).send();
  } else {
    res.status(403).send();
  }
});

router.get('/users/:id', (req, res) => {
  console.log(req.path.id);
  res.status(200).send(JSON.stringify(controller.getUser(req.params.id)));
});

router.get('/', (req, res) => {
  res.send('here');
});

// // Error handler
// app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
//   logger.error(error);
//   res.status(500).send(error.stack);
// });

app.use('/', router);

app.listen(process.env.PORT || 3000);
