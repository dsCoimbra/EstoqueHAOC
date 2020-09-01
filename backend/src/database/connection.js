const knex = require('knex');
const configuration = require('../../knexfile');

const connection = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  });

module.exports = connection;