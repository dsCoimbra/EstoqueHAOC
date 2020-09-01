
exports.up = function(knex) {
    return knex.schema.createTable('tb_services_provider_has_provider', function (table){
        table.integer('idService').unsigned();
        table.integer('idProvider').unsigned();
        table.foreign('idService').references('tb_services_provider.id');
        table.foreign('idProvider').references('tb_providers.id');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_services_provider_has_provider')
};
