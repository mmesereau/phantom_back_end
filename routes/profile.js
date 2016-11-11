'use strict';
var router = require('express').Router();
var db = require('monk')(process.env.MONGODB_URI || 'localhost/phantom');
var users = db.get('users');

router.get('/', function(req, res) {
  users.find({id: req.user.id})
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    console.log(err);
    res.send('failure!');
  });
});
// var knex = require('../db/knex');
//
// router.get('/', function(req, res) {
//   console.log(req);
//   knex('users').where('id', req.user.id)
//   .then(function(data) {
//     res.send(data);
//   })
//   .catch(function(err) {
//     res.send(err);
//   });
// });

module.exports = router;
