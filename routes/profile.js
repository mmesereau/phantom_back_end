'use strict';
var router = require('express').Router();
var knex = require('../db/knex');

router.get('/:id', function(req, res) {
  knex('users').where('id', req.params.id)
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    res.send(err);
  });
});

module.exports = router;
