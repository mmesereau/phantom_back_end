
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('username');
    table.string('password');
    table.string('nickname');
    table.integer('wins');
    table.integer('losses');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
