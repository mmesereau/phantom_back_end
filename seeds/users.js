
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1, username: 'Mike1', password: '12345', nickname: 'Mike', wins: 7, losses: 2}),
        knex('users').insert({id: 2, username: 'Mike2', password: '12345', nickname: 'Michael', wins: 2, losses: 7}),
        knex('users').insert({id: 3, username: 'Mike3', password: '12345', nickname: 'Mikey', wins: 0, losses: 9})
      ]);
    });
};
