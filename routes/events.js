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

router.get('/events', authorize, (_req, res, next) => {
  const date = moment().format();

  request(`http://api.jambase.com/events?zipCode=98034&radius=50&startDate=${date}&page=0&api_key=uazyeq8ba3c3vxa6uewvud2b`, (err, response, body) => {
    if (err) {
      return next(boom.create(400, 'Bad Request'));
    }
    const obj = JSON.parse(body);

    res.send(obj);
  });
});

router.post('/attendeesGoing', authorize, (req, res, next) => {
  const { userId } = req.token;
  const eventId = req.body.eventId;

  knex('user_events')
    .innerJoin('users', 'users.id', 'user_events.user_id')
    .whereNot('user_id', userId)
    .andWhere('event_id', eventId)
    .andWhere('going', true)
    .then((rows) => {
      if (!rows) {
        return next(boom.create(400, 'something went wrong.'));
      }
      const camelRows = camelizeKeys(rows);

      res.send(camelRows);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/attendeesMaybe', authorize, (req, res, next) => {
  const { userId } = req.token;
  const eventId = req.body.eventId;

  knex('user_events')
    .innerJoin('users', 'users.id', 'user_events.user_id')
    .whereNot('user_id', userId)
    .andWhere('event_id', eventId)
    .andWhere('maybe', true)
    .then((rows) => {
      if (!rows) {
        return next(boom.create(400, 'something went wrong.'));
      }
      const camelRows = camelizeKeys(rows);

      res.send(camelRows);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/going', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('user_events')
    .where('user_id', userId)
    .andWhere('going', true)
    .then((rows) => {
      if (!rows) {
        return next(boom.create(400, 'something went wrong.'));
      }
      const userEvents = camelizeKeys(rows);

      res.send(userEvents);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/maybe', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('user_events')
    .where('user_id', userId)
    .andWhere('maybe', true)
    .then((rows) => {
      if (!rows) {
        return next(boom.create(400, 'something went wrong.'));
      }
      const userEvents = camelizeKeys(rows);

      res.send(userEvents);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/events', authorize, (req, res, next) => {
  const { userId } = req.token;

  let insertEvent = {
    userId: userId,
    going: req.body.going,
    maybe: req.body.maybe,
    artistName: req.body.artistName,
    venueName: req.body.venueName,
    eventDate: req.body.eventDate,
    eventId: req.body.eventId
  };

  knex('user_events')
    .where('user_id', userId)
    .andWhere('event_id', insertEvent.eventId)
    .then((rows) => {
      if (rows.length > 0) {
        return next(boom.create(400, 'Event already exists.'))
      }
      else {
        return knex('user_events')
        .insert(decamelizeKeys(insertEvent))
        .then((row) => {
          if (!row) {
            return next(boom.create(400, 'something went wrong.'));
          }

          res.send(true);
        })
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/events', authorize, (req, res, next) => {
  const { userId } = req.token;
  const eventId = req.body.eventId;
  const event = {};

  knex('user_events')
    .where('user_id', userId)
    .andWhere('event_id', eventId)
    .then((row) => {
      if (!row) {
        return next(boom.create(404, 'Event not found.'));
      }

      event.userId = userId;
      event.eventId = eventId;

      return knex('user_events')
        .del()
        .where('event_id', eventId)
        .andWhere('user_id', userId)
    })
    .then(() => {
      res.send(camelizeKeys(event));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
