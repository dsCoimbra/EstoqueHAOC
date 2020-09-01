
exports.up = function(knex) {
    return knex.schema.createTable('tb_heritages_has_requests', function (table){
        table.integer('idHeritage').unsigned();
        table.integer('idRequest').unsigned();
        table.foreign('idHeritage').references('tb_heritages.id');
        table.foreign('idRequest').references('tb_resquests.id');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_heritages_has_requests')
};
