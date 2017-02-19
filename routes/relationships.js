'use strict';

// eslint-disable-next-line new-cap

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const request = require('request');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const { camelizeKeys, decamelizeKeys } = require('humps');

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

router.get('/followingList', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('user_relationships')
    .innerJoin('users', 'users.id', 'user_relationships.following_id')
    .where('user_relationships.user_id', userId)
    .then((rows) => {
      if (!rows) {
        return next(boom.create(400, 'something went wrong.'));
      }
      const camelRow = camelizeKeys(rows);

      for (let i = 0; i < camelRow.length; i++) {
        delete camelRow[i].hashedPassword;
      }

      res.send(camelRow);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/relationships', authorize, (req, res, next) => {
  const { userId } = req.token;
  const newFollow = { userId: userId, followingId: req.body.data.follow };

  knex('user_relationships')
    .insert(decamelizeKeys(newFollow))
    .then((row) => {
      if (!row) {
        return next(boom.create(404, 'User not found.'));
      }

      res.send(true);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/relationships', authorize, (req, res, next) => {
  const { userId } = req.token;
  const followId = req.body.followingId;
  const follow = {};

  knex('user_relationships')
    .where('user_id', userId)
    .andWhere('following_id', followId)
    .then((row) => {
      if (!row) {
        return next(boom.create(404, 'Follow not found.'));
      }

      follow.userId = userId;
      follow.followId = followId;

      return knex('user_relationships')
        .del()
        .where('user_id', userId)
        .andWhere('following_id', followId)
    })
    .then(() => {
      res.send(camelizeKeys(follow))
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
