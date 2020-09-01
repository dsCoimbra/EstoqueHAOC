
exports.up = function(knex) {
    return knex.schema.createTable('tb_requests', function (table){
        table.increments('id').primary();
        table.integer('idStatus').unsigned();
        table.integer('idSector').unsigned();
        table.integer('idUser').unsigned();
        table.string('requestInternal');
        table.string('linkrequestinternal');
        table.datetime('openingdate');  
        table.foreign('idStatus').references('tb_status.id');
        table.foreign('idSector').references('tb_sectors.id');
        table.foreign('idUser').references('tb_users.id');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_requests')
};
