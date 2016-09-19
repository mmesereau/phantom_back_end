'use strict';
var router = require('express').Router();
var jwt = require('jsonwebtoken');
var knex = require('../db/knex');
var bcrypt = require('bcrypt');


router.post('/', function(req, res) {
  knex('users').where('username', req.body.username)
  .then(function(data) {
    console.log(data);
    console.log(req.body);
    return bcrypt.compare(req.body.password, data[0].password, function(err, result) {
      if (result) {
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
      }
      else {
        console.log(err);
      }
    });
  })
  .catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
