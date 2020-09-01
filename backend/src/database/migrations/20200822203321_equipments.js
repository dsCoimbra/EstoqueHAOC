
exports.up = function(knex) {
    return knex.schema.createTable('tb_equipments', function (table){
        table.increments('id').primary();
        table.integer('idCategory').unsigned();
        table.integer('idBrand').unsigned();
        table.integer('idModel').unsigned();
        table.foreign('idCategory').references('tb_categories.id');
        table.foreign('idBrand').references('tb_brands.id');
        table.foreign('idModel').references('tb_models.id');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_equipments')
};
