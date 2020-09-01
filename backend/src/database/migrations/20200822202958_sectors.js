
exports.up = function(knex) {
    return knex.schema.createTable('tb_sectors', function (table){
        table.increments('id').primary();
        table.string('name');
        table.string('costCenter', 10);
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_sectors')
};
