
exports.up = function(knex) {
    return knex.schema.createTable('tb_loan', function (table){
        table.increments('id').primary();
        table.integer('idMaintenances').unsigned();
        table.integer('idEquipment').unsigned();
        table.foreign('idMaintenances').references('tb_maintenances.id');
        table.foreign('idEquipment').references('tb_equipment.id');
    });  
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_loan');
};
