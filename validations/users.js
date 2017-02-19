'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    firstName: Joi.string()
      .label('First Name')
      .required()
      .trim()
      .min(1),
    lastName: Joi.string()
      .label('Last Name')
      .required()
      .trim()
      .min(1),
    username: Joi.string()
      .label('User Name')
      .required()
      .trim()
      .min(1)
      .max(25),
    email: Joi.string()
      .label('Email')
      .required()
      .email()
      .trim(),
    password: Joi.string()
     .label('Password')
     .required()
     .trim()
     .min(8)
  }
};
