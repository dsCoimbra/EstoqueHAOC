
exports.up = function(knex) {
    return knex.schema.createTable('tb_heritages', function (table){
        table.increments('id').primary();
        table.integer('idEquipment').unsigned();
        table.string('characteristics');
        table.string('patrimony',10)
        table.foreign('idEquipment').references('tb_equipments.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_heritages')
};
