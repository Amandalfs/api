const UsersRepositorie = require('../repositories/UsersRepositorie');
const UserCreateService = require('../services/UserCreateService');
const UserUpdateService = require('../services/UserUpdateService');

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

        const usersRepositorie = new UsersRepositorie;
        const userUpdateService = new UserUpdateService(usersRepositorie);
        
        const userUpdate = await userUpdateService.execute(id,{name, email, password}, old_password);

        return res.status(200).json();
    }
}

module.exports = UsersController;