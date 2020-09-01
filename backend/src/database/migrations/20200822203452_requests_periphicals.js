
exports.up = function(knex) {
    return knex.schema.createTable('tb_requests_has_periphicals', function (table){
        table.integer('idRequest').unsigned();
        table.integer('idPeriphical').unsigned();
        table.foreign('idRequest').references('tb_requests.id');
        table.foreign('idPeriphical').references('tb_periphicals.id');
    })
};

exports.down = function(knex) {
  
};
