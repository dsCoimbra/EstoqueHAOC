
exports.up = function(knex) {
  return knex.schema.createTable('tb_ram', function (table){
      table.increments('id').primary();
      table.string('name');

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_ram');
};
