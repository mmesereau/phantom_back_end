'use strict';
var router = require('express').Router();
var jwt = require('jsonwebtoken');
var db = require('monk')(process.env.MONGODB_URI || 'localhost/phantom');
// var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var users = db.get('users');

router.post('/', function(req, res) {
  users.find({username: req.body.username})
  .then(function(data) {
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
        res.status(400).json({
          message: err
        });
      }
    });
  })
  .catch(function(err) {
    console.log(err);
    res.send('failure');
  });
});


// router.post('/', function(req, res) {
//   knex('users').where('username', req.body.username)
//   .then(function(data) {
//     return bcrypt.compare(req.body.password, data[0].password, function(err, result) {
//       if (result === true) {
//         var profile = {
//           id: data[0].id,
//           username: data[0].username,
//           nickname: data[0].nickname,
//           wins: data[0].wins,
//           losses: data[0].losses
//         };
//         var token = jwt.sign(profile, process.env.SECRET);
//         res.status(200).json({
//           token: token
//         });
//       }
//       else {
//         res.status(400).json({
//           message: err
//         });
//       }
//     });
//   })
//   .catch(function(err) {
//     console.log(err);
//     res.status(400).json({
//       message: err
//     });
//   });
// });

module.exports = router;
