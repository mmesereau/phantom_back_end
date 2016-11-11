'use strict';
var router = require('express').Router();
var db = require('monk')(process.env.MONGODB_URI || 'localhost/phantom');
var users = db.get('users');

router.post('/', function(req, res) {
  users.find({nickname: req.body.nickname})
  .then(function(data) {
    if (data[0]) {
      data[0].wins++;
      return users.update({nickname: req.body.nickname}, data[0]);
    }
    else {
      return users.insert({nickname: req.body.nickname, wins: 1, losses: 0});
    }
  })
  .then(function() {
    res.send('success!');
  })
  .catch(function(err) {
    console.log(err);
    res.send('failure!');
  });
});
// var knex = require('../db/knex');

// router.put('/', function(req, res) {
//   knex('users').where('id', req.params.id)
//   .then(function(data) {
//     if (data[0]) {
//       data[0].wins += 1;
//     }
//     return knex('users').where('id', req.params.id).update(data[0]);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });
// });

// router.post('/', function(req, res) {
//   knex('users').where('nickname', req.body.nickname)
//   .then(function(data) {
//     if (data[0]) {
//       data[0].wins++;
//       return knex('users').where('nickname', req.body.nickname).update(data[0]);
//     }
//     else {
//       return knex('users').insert({nickname: req.body.nickname, wins: 1, losses: 0});
//     }
//   })
//   .then(function() {
//     res.send("success");
//   })
//   .catch(function(err) {
//     console.log(err);
//   });
// });




module.exports = router;
