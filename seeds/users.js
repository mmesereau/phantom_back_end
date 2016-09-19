
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1, username: 'Mike1', password: 'ed635c0bdc7540ab926710f7c828dcb9', nickname: 'Mike', wins: 7, losses: 2}),
        knex('users').insert({id: 2, username: 'Mike2', password: 'ed635c0bdc7540ab926710f7c828dcb9', nickname: 'Michael', wins: 2, losses: 7}),
        knex('users').insert({id: 3, username: 'Mike3', password: 'ed635c0bdc7540ab926710f7c828dcb9', nickname: 'Mikey', wins: 0, losses: 9})
      ]);
    });
};
