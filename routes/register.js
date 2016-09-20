'use strict';
var router = require('express').Router();
var knex = require('../db/knex');
var hash = require('./hash');
var bcrypt = require('bcrypt');


router.post('/', function(req, res) {
  hash(req.body.password)
  .then(function(result) {
    return knex('users').insert({
      username: req.body.username,
      password: result,
      nickname: req.body.nickname,
      wins: 0,
      losses: 0
    }).returning('*');
  })
  .then(function(data) {
    console.log(data);
    res.send("SUCCESS");
  })
  .catch(function(err) {
    res.send(err);
    console.log(err);
  });
});

module.exports = router;
