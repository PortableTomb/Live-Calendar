'use strict';

// eslint-disable-next-line new-cap

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const jwt = require('jsonwebtoken');
const validations = require('../validations/users');

const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.token = decoded;
    next();
  });
};

router.post('/username', authorize, (req, res, next) => {
  const { userId } = req.token;
  const username = req.body.username.searchText;

  knex('users')
    .where({username: username})
    .then((row) => {

      const camelRow = camelizeKeys(row[0]);
      const user = {
        firstName: camelRow.firstName,
        lastName: camelRow.lastName,
        username: camelRow.username,
        userId: camelRow.id
      }

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/users', ev(validations.post), (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;

  knex('users')
    .where('email', email)
    .then((row) => {
      if (row.length) {
        return next(boom.create(400, 'Invalid username, email or password.'));
      }
    });

  bcrypt.hash(password, 12)
    .then((hashedPassword) => {
      const insertUser = { firstName, lastName, username, email, hashedPassword };

      return knex('users').insert(decamelizeKeys(insertUser), '*');
    })
    .then((rows) => {
      const user = camelizeKeys(rows[0]);

      delete user.hashedPassword;

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
