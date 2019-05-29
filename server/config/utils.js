'use strict';

const crypto = require('crypto');
const errors = require('../lib/errors');

const genRandomString = function (length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

const sha512 = function (password, salt) {
  let hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('hex');
};

exports.saltHashPassword = function (password) {
  let salt = genRandomString(16);
  let passwordHash = sha512(password, salt);
  return {
    salt: salt,
    passwordHash: passwordHash
  };
};

exports.hashPassword = function (password, salt) {
  return sha512(password, salt);
};
