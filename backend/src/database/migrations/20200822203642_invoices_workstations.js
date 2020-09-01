
exports.up = function(knex) {
    return knex.schema.createTable('tb_invoices_has_workstations', function (table){
        table.integer('idInvoice').unsigned();
        table.integer('idWorkstation').unsigned();
        table.foreign('idInvoice').references('tb_invoices.id');
        table.foreign('idWorkstation').references('tb_workstations.id');
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_invoices_has_workstations');  
};
