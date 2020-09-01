
exports.up = function(knex) {
    return knex.schema.createTable('tb_comments', function (table){
        table.increments('id').primary();
        table.integer('idRequest').unsigned();
        table.integer('idUser').unsigned();
        table.text('description');
        table.foreign('idRequest').references('tb_requests.id');
        table.foreign('idUser').references('tb_users.id');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_comments')
};
