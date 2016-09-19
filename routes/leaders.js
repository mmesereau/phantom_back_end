'use strict';
var router = require('express').Router();
var knex = require('../db/knex');

router.get('/', function(req, res) {
  knex('users')
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
