
exports.up = function(knex) {
    return knex.schema.createTable('tb_workstations', function (table){
        table.increments('id').primary();
        table.integer('idEquipment').unsigned();
        table.integer('idHd').unsigned();
        table.integer('idProcessor').unsigned();
        table.integer('idRam').unsigned();
        table.string('patrimony', 8);
        table.string('serialnumber');
        table.foreign('idEquipment').references('tb_equipments.id')
        table.foreign('idHd').references('tb_hd.id')
        table.foreign('idProcessor').references('tb_processors.id')
        table.foreign('idRam').references('tb_rams.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_workstations')
};
