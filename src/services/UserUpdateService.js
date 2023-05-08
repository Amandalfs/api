const { compare, hash } = require("bcrypt");
const AppError = require('../utils/AppError')

module.exports = class UserUpdateService{
    usersRepositorie
    constructor(UsersRepositorie){
        this.usersRepositorie = UsersRepositorie
    }


    async execute(id, data, old_password){
        const user = await this.usersRepositorie.findById(id)

        if(!user){
            throw new AppError("Usuario nao encontrado");
        }

        const userVerificarAtualizacaoEmail = await this.usersRepositorie.findByEmail(data.email);

        if(userVerificarAtualizacaoEmail && userVerificarAtualizacaoEmail.id !== user.id){
            throw new  AppError("Nao pode mudar email, uma conta com esse email ja existe");
        }

        user.name = data.name ?? user.name;
        user.email = data.email ?? user.email;

        if(data.password && !old_password){
            throw new AppError("Precisa informar a senha antiga para redefinir a senha");
        }

        if(data.password && old_password){
            const checkPassword = await compare(old_password, user.password)
            
            if(!checkPassword){
                throw new AppError("A senha antiga nao confere.")
            }

            user.password = await hash(data.password, 8);
        }

        const result = await this.usersRepositorie.updateUser(id, {name:user.name, email:user.email, password:user.password});
        return result;
    }
}