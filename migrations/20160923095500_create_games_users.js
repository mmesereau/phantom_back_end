
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games-users', function(table) {
    table.increments();
    table.integer('games_id');
    table.integer('users_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games-users');
};
