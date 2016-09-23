
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('games').insert({id: 1, name: 'game1'}),
        knex('games').insert({id: 2, name: 'game2'}),
        knex('games').insert({id: 3, name: 'game3'})
      ]);
    });
};
