const express = require('express');
const logger = require('./utils/logger');
const bunyanRequest = require('bunyan-request');
const bodyParser = require('body-parser');
const controller = require('./controller');
const multer = require('multer');
const upload = multer().single('file');
const app = express();

// Health check
app.get('/', (req, res) => res.send());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // support json encoded bodies
// Request logging
app.use(bunyanRequest({ logger }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // support json encoded bodies

const jsonParser = bodyParser.json();

app.post('/api/register', jsonParser, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    const user = req.body.userName;
    const password = req.body.password;

    if (req.file) {
      const registerUser = controller.registerUser({
        image: req.file,
        userName: user,
        password: password
      });

      if (req.file) {
        res.send('Upload received');
        console.log(req.file);
        console.log('body:', req.body);
      }
    }
  });
});

app.get('/api/login', (req, res) => {
  const login = controller.loginUser();
  if (login) {
    // generate JWT
    // add JWT to response
    res.status(200).send();
  } else {
    res.status(403).send();
  }
});

app.get('/api/users/:id', (req, res) => {
  console.log(req.path.id);
  res.status(200).send(JSON.stringify(controller.getUser(req.params.id)));
});

// Error handler
app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  logger.error(error);
  res.status(500).send(error.stack);
});

app.listen(process.env.PORT || 3000);
