const db = require('../database/knex')

class UsersRepositorie{
    async findByEmail(email){     
        const user = await db('users').where({email}).first();
        return user;
    }

    async createUser({name, email, password }){
        const user_id = await db('users').insert({name, email, password});
        return {id: user_id};
    }
}

module.exports = UsersRepositorie;