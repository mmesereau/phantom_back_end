'use strict';
var router = require('express').Router();
var db = require('monk')(process.env.MONGODB_URI || 'localhost/phantom');
var users = db.get('users');

router.post('/', function(req, res) {
  users.find({nickname: req.body.nickname})
  .then(function(data) {
    if (data[0]) {
      data[0].losses++;
      return users.update({nickname: req.body.nickname}, data[0]);
    }
    else {
      return users.insert({nickname: req.body.nickname, wins: 0, losses: 1});
    }
  })
  .then(function() {
    res.send('success!');
  })
  .catch(function(err) {
    res.send('failure!');
  });
});
// var knex = require('../db/knex');
//
//
//
// router.post('/', function(req, res) {
//   knex('users').where('nickname', req.body.nickname)
//   .then(function(data) {
//     if (data[0]) {
//       data[0].losses++;
//       return knex('users').where('nickname', req.body.nickname).update(data[0]);
//     }
//     else {
//       return knex('users').insert({nickname: req.body.nickname, wins: 0, losses: 1});
//     }
//   })
//   .then(function() {
//     res.send("success");
//   })
//   .catch(function(err) {
//     console.log('hi', err);
//   });
// });




module.exports = router;
