
exports.up = function(knex) {
    return knex.schema.createTable('tb_invoices', function (table){
        table.increments('id').primary();
        table.integer('idSector').unsigned();
        table.integer('GPI');
        table.datetime('date')
        table.foreign('idSector').references('tb_sectors.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_invoices')
};
