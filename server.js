'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 8000;
const server = require('http').createServer(app);
const path = require('path');

const events = require('./routes/events');
const users = require('./routes/users');
const token = require('./routes/token');
const relationships = require('./routes/relationships');

app.disable('x-powered-by');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(events);
app.use(users);
app.use(token);
app.use(relationships);

app.use(express.static(path.join('public')));

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(JSON.stringify(err, null, 2));

  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.statusText);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

server.listen(port, () => {
  console.log('Listening on port', port);
});
