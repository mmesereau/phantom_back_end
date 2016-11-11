'use strict';
var router = require('express').Router();
var db = require('monk')(process.env.MONGODB_URI || 'localhost/phantom');
var leaders = db.get('users');

router.get('/', function(req, res) {
  leaders.find()
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    console.log(err);
    res.send('failure');
  });
});
// var knex = require('../db/knex');
//
// router.get('/', function(req, res) {
//   knex('users')
//   .then(function(data) {
//     res.send(data);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });
// });

module.exports = router;
