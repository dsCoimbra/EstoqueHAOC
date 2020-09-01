
exports.up = function(knex) {
    return knex.schema.createTable('tb_invoices_has_heritages_has_requests', function (table){
        table.integer('idInvoice').unsigned();
        table.integer('idRequest').unsigned();
        table.integer('idHeritage').unsigned();
        table.foreign('idInvoice').references('tb_invoices.id');
        table.foreign('idRequest').references('tb_heritages_requests.idRequest');
        table.foreign('idHeritage').references('tb_heritages_requests.idHeritage');
    })  
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_invoices_has_heritages_has_requests')  
};
