const express = require('express');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const bunyanRequest = require('bunyan-request');
const bodyParser = require('body-parser');
const controller = require('./controller');
const multer = require('multer');
const upload = multer().single('file');
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // support json encoded bodies
// Request logging
app.use(bunyanRequest({ logger }));

// Health check
app.get('/', (req, res) => res.send());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // support json encoded bodies

app.post('/api/register', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    if (req.file) {
      res.send('Upload received');
      console.log(req.file);
      console.log('body:', req.body);
    }
  });
});

const router = express.Router();

router.get('/api/login', (req, res) => {
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

router.get('/api/users/:id', (req, res) => {
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
