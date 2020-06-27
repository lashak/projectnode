const config = require('./config');
module.exports = require('knex')({
      client: config.database.name,
      connection: {
      host: config.database.host,
      user: config.database.username,
      password: config.database.password,
      database: config.database.db
    },
    debug: true,
    pool: { min: 2, max: 5 }
});