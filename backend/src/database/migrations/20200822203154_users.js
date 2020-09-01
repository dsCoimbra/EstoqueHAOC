
exports.up = function(knex) {
    return knex.schema.createTable('tb_users', function (table){
        table.increments('id').primary();
        table.string('name');
        table.string('email');
        table.string('pass');
        table.string('typeUser',1);
        table.string('aproved', 1)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_users')
};
