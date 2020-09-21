
exports.up = function(knex) {
    return knex.schema.createTable('tb_maintenances', function (table){
        table.increments('id').primary();
        table.integer('idProvider').unsigned();
        table.integer('idSector').unsigned();
        table.string('internalRequest', 10);
        table.string('externalRequest');
        table.datetime('date');
        table.string('statusMaintenance',1);
        table.string('description');
        table.string('equipment');
        table.string('heritage', 10);
        table.string('serialNumber');
        table.string('model');
        table.foreign('idProvider').references('tb_providers.id');
        table.foreign('idSector').references('tb_sectors.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_maintenances')
};
