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

    async updateUser(id, data){
        await db('users').where('id', id).update({name: data.name, email:data.email, password:data.password});
    }

    async findById(id){
        const user = await db('users').where('id', id).first();
        return user;
    }
}

module.exports = UsersRepositorie;