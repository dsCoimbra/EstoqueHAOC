
exports.up = function(knex) {
    return knex.schema.createTable('tb_providers_has_servicesprovider', function (table){
        table.integer('idProvider').unsigned();
        table.integer('idServiceProvider').unsigned();
        table.foreign('idProvider').references('tb_provider.id');
        table.foreign('idServiceProvider').references('tb_servicesprovider')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_providers_has_serviceprovider')
};
