
exports.up = function(knex) {
    return knex.schema.createTable('tb_periphicals', function (table){
        table.increments('id').primary();
        table.integer('idEquipment').unsigned();
        table.string('characteristics');
        table.integer('quantity');
        table.integer('minquantity');
        table.foreign('idEquipment').references('tb_equipments.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_periphicals')
};
