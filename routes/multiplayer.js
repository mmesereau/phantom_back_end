'use strict';

var router = require('express').Router();
var knex = require('../db/knex');

router.get('/', function(req, res) {
  var games;
  knex('games')
  .then(function(data) {
    games = data;
    return knex('games-users');
  })
  .then(function(data) {
    for (var i = 0; i < games.length; i++) {
      games[i].users = [];
      for (var j = 0; j < data.length; j++) {
        if (data[j].games_id === games[i].id) {
          games[i].users.push(data[j].users_id);
        }
      }
    }
    res.send(games);
  })
  .catch(function(err) {
    res.error(err);
  });
});

router.post('/', function(req ,res) {
  knex('games').insert({name: req.body.name}).returning('*')
  .then(function(data) {
    return knex('games-users').insert({games_id: data[0].id, users_id: req.body.id});
  })
  .catch(function(err) {
    console.log(err);
  });
});

router.put('/', function(req, res) {
  knex('games-users').insert(req.body)
  .then(function() {
    res.send('success');
  })
  .catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
