
exports.up = function(knex) {
    return knex.schema.createTable('tb_brands', function (table){
        table.increments('id').primary();
        table.string('name');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_brands')
};
