const { hash } = require('bcrypt');
const AppError = require('../utils/AppError');


class UserCreateService{
    constructor(UsersRepositorie){
        this.usersRepositorie = UsersRepositorie;
    }

    async execute({name, email, password}){
        const checkUsersExist = await this.usersRepositorie.findByEmail(email);
        
        if(checkUsersExist){
            throw new AppError("Este E-mail ja esta em uso");
        }

        const hashedPassword = await hash(password, 8);

        const userCreated = await this.usersRepositorie.createUser({name, email, password: hashedPassword})
        return userCreated;
    }
}

module.exports = UserCreateService;