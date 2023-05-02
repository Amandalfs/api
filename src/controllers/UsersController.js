const AppError = require('../utils/AppError');

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

        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password])
        return res.status(201).json();
    }
}

module.exports = UsersController;