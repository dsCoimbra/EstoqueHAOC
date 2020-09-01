
exports.up = function(knex) {
    return knex.schema.createTable('teste', function (table){
        table.string('id').primary();
        table.string('name').notNullable();
    })
  
};

exports.down = function(knex) {
  
};
