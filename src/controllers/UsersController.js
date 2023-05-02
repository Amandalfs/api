const AppError = require('../utils/AppError');
const { hash } = require('bcrypt');

const sqliteConection = require('../database/sqlite');
const appError = require('../utils/AppError');

class UsersController {
    async create(req, res){
        const { name, email, password } = req.body;

        const database = await sqliteConection();
        const checkUsersExis = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(checkUsersExis){
            throw new appError("Este E-mail ja esta em uso")
        }

        const hashedPassword = await hash(password, 8);

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])
        return res.status(201).json();
    }

    async update(req, res){
        const { name, email } = req.body;
        const { id } = req.params;

        const database = sqliteConection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user){
            throw new appError("Usuario nao encontrado");
        }

        const userVerificarAtualizacaoEmail = await database.get("SELECT * FROM users WHERE email = (?)")
    }
}

module.exports = UsersController;