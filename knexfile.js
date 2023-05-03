const path = require('path');

module.exports = {
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: path.resolve(__dirname, "src", "database", "database.db"),
        },
        pool:{
            afterCreate: (connect, cb) => connect.run("PRAGMA foreign_keys = ON", cb)
        },
        migrations: {
            directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
        }
    }
}