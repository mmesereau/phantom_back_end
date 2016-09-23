
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    return Promise.all([
      // Inserts seed entries
      knex('users').insert({id: 1, username: 'Mike1', nickname: 'Mike1', wins: 0, losses: 0}),
      knex('users').insert({id: 2, username: 'Mike2', nickname: 'Mike2', wins: 0, losses: 0}),
      knex('users').insert({id: 3, username: 'Mike3', nickname: 'Mike3', wins: 0, losses: 0})
    ]);
  });
};
