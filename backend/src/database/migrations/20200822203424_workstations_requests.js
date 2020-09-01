
exports.up = function(knex) {
    return knex.schema.createTable('tb_workstations_has_requests', function (table){
        table.integer('idWorkstation').unsigned();
        table.integer('idRequest').unsigned();
        table.foreign('idWorkstation').references('tb_workstatios.id');
        table.foreign('idRequest').references('tb_requests.id')
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_workstations_has_requests')
};
