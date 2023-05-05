const AppError = require('../utils/AppError');
const { hash, compare } = require('bcrypt');

const sqliteConection = require('../database/sqlite');

const UsersRepositorie = require('../repositories/UsersRepositorie');
const UserCreateService = require('../services/UserCreateService');

class UsersController {
    async create(req, res){
        const { name, email, password } = req.body;

        const usersRepositorie = new UsersRepositorie;
        const userCreateService = new UserCreateService(usersRepositorie);
        
        const userCreated = await userCreateService.execute({name, email, password});
        
        return res.status(201).json();
    }

    async update(req, res){
        const { name, email, password, old_password } = req.body;
        const { id } = req.user;

        const database = await sqliteConection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        if(!user){
            throw new AppError("Usuario nao encontrado");
        }

        const userVerificarAtualizacaoEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(userVerificarAtualizacaoEmail && userVerificarAtualizacaoEmail.id !== user.id){
            throw new  AppError("Nao pode mudar email, uma conta com esse email ja existe")
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password && !old_password){
            throw new AppError("Precisa informar a senha antiga para redefinir a senha")
        }

        if(password && old_password){
            const checkPassword = await compare(old_password, user.password)
            
            if(!checkPassword){
                throw new AppError("A senha antiga nao confere.")
            }

            user.password = await hash(password, 8);
        }

        await database.run(
        `UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?`,
        [user.name, user.email, user.password, id]
        );

        return res.status(200).json()
    }
}

module.exports = UsersController;