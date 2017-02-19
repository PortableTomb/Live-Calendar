'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    email: Joi.string()
      .label('Email')
      .email()
      .required()
      .min(0)
      .trim(),
    password: Joi.string()
      .label('Password')
      .required()
      .trim()
      .min(8)
  }
};
