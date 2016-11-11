'use strict';

var router = require('express').Router();
// var knex = require('../db/knex');
var db = require('monk')(process.env.MONGODB_URI || 'localhost/phantom');
var games = db.get('games');

router.get('/', function(req, res) {
  games.find()
  .then(function(data) {
    res.send(data);
  })
  .catch(function(err) {
    console.log(err);
    res.send('failure!');
  });
});

router.post('/', function(req, res) {
  games.insert({
    name: req.body.name,
    users: [
      {username: req.body.nickname}
    ],
    inProgress: false
  })
  .then(function() {
    res.send('success!');
  })
  .catch(function(err) {
    console.log(err);
    res.send('failure!');
  });
});

router.post('/join', function(req, res) {
  games.find({name: req.body.name})
  .then(function(data) {
    data.users.push({username: req.body.nickname});
    return games.update({name: req.body.name}, data);
  })
  .then(function() {
    res.send('success!');
  })
  .catch(function(err) {
    console.log(err);
    res.send('failure!');
  });
});

// router.get('/', function(req, res) {
//   var games;
//   knex('games')
//   .then(function(data) {
//     games = data;
//     return knex('games-users');
//   })
//   .then(function(data) {
//     for (var i = 0; i < games.length; i++) {
//       games[i].users = [];
//       for (var j = 0; j < data.length; j++) {
//         if (data[j].games_id === games[i].id) {
//           games[i].users.push({id: data[j].users_id});
//         }
//       }
//     }
//     return knex('users')
//   })
//   .then(function(data) {
//     for (var i = 0; i < games.length; i++) {
//       for (var j = 0; j < games[i].users.length; j++) {
//         for (var k = 0; k < data.length; k++) {
//           if (data[k].id === games[i].users[j].id) {
//             games[i].users[j].username = data[k].nickname;
//           }
//         }
//       }
//     }
//     res.send(games);
//   })
//   .catch(function(err) {
//     res.error(err);
//   });
// });
//
// router.post('/', function(req ,res) {
//   knex('games').insert({name: req.body.name}).returning('*')
//   .then(function(data) {
//     console.log(data);
//     return knex('games-users').insert({games_id: data[0].id, users_id: req.body.id});
//   })
//   .then(function() {
//     res.send('success');
//   })
//   .catch(function(err) {
//     console.log(err);
//   });
// });
//
// router.post('/join', function(req, res) {
//   knex('games-users').insert(req.body)
//   .then(function() {
//     res.send('success');
//   })
//   .catch(function(err) {
//     console.log(err);
//   });
// });

module.exports = router;
