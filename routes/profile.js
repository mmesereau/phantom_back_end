'use strict';
var router = require('express').Router();
var knex = require('../db/knex');

router.get('/', function(req, res) {
  console.log(req);
  console.log("hello", req.user);
});

module.exports = router;
