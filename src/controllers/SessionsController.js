const { compare } = require('bcrypt');
const db = require('../database/knex');
const AppError = require('../utils/AppError');
const AuthConfig = require("../config/auth");
const { sign } = require('jsonwebtoken');

class SessionsController {
    async create(req, res){
        const { email, password } = req.body;

        const user = await db('users').where({email}).first();
        const ComparedPassword = await compare(password, user.password);
        
        if(!user){  
            throw new AppError("mail e/ou senha Incorreta!");
        }

        if(!ComparedPassword){
            throw new AppError("Email e/ou senha Incorreta!");
        }

        const { secret, expiresIn} = AuthConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return res.json({user,  token});
    }
}

module.exports = SessionsController;