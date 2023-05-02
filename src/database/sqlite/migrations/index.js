const sqliteConection = require('../../sqlite/index');
const createUsers = require('./createUsers');

async function migrationsRun(){
    const schemas = [
        createUsers
    ].join('');

    await sqliteConection()
    .then(db => {
        db.exec(schemas);
    })
    .catch(error => console.error(error));
}

module.exports = migrationsRun;