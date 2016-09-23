
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games-users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('games-users').insert({id: 1, games_id: 1, users_id: 1}),
        knex('games-users').insert({id: 2, games_id: 1, users_id: 2}),
        knex('games-users').insert({id: 3, games_id: 1, users_id: 3}),
        knex('games-users').insert({id: 4, games_id: 2, users_id: 1}),
        knex('games-users').insert({id: 5, games_id: 2, users_id: 2}),
        knex('games-users').insert({id: 6, games_id: 3, users_id: 2}),
        knex('games-users').insert({id: 7, games_id: 3, users_id: 3})
      ]);
    });
};
