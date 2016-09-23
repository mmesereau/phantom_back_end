'use strict';
var router = require('express').Router();
var jwt = require('jsonwebtoken');
var knex = require('../db/knex');
var hash = require('./hash');
var bcrypt = require('bcrypt');


router.post('/', function(req, res) {
  console.log(req.body);
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
    var profile = {
      id: data[0].id,
      username: data[0].username,
      nickname: data[0].nickname,
      wins: data[0].wins,
      losses: data[0].losses
    };
    var token = jwt.sign(profile, process.env.SECRET);
    res.status(200).json({
      token: token
    });
    res.send(data);
  })
  .catch(function(err) {
    res.send(err);
    console.log(err);
  });
});

module.exports = router;
