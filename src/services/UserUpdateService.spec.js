const UserRepositoryInMemoryPreenchido = require('../repositories/UserRepositoryInMemoryPreenchido');
const AppError = require('../utils/AppError');
const UserUpdateService = require('./UserUpdateService');

describe("UserUpdateService", ()=>{
    let userRepositoryInMemoryPreenchido = null;
    let userUpdateService = null;

    beforeEach(()=>{
        userRepositoryInMemoryPreenchido = new UserRepositoryInMemoryPreenchido;
        userUpdateService = new UserUpdateService(userRepositoryInMemoryPreenchido);

    })

    it("the user must modify the data", async ()=>{
        const userNew = {
            name: "User test",
            email: "user5@test.com",
            password: "12345"
        }
       
        
        const userUpdated = await userUpdateService.execute(5, userNew, "12345678");
        expect(userUpdated).toHaveProperty("id");
    })

    it("User not should be updated with exists email", async()=>{
        const user1 = {
            name: 'User Test 1', 
            email: 'user2@test.com',
            password: "123"
        };


        await expect(userUpdateService.execute(3, user1, "12345678")).rejects.toEqual(new AppError("Nao pode mudar email, uma conta com esse email ja existe"))

    })

    it("User will have different passwords", async()=>{
        const user1 = {
            name: 'User Test 1', 
            email: 'user2@test.com',
            password: "123"
        };


        await expect(userUpdateService.execute(5, user1, "12345")).rejects.toEqual(new AppError("A senha antiga nao confere."))

    })

    it("old password not informed", async()=>{
        const user1 = {
            name: 'User Test 1', 
            email: 'user2@test.com',
            password: "123"
        };


        await expect(userUpdateService.execute(5, user1)).rejects.toEqual(new AppError("Precisa informar a senha antiga para redefinir a senha"))

    })

    it("User cannot be found", async()=>{
        const user1 = {
            name: 'User Test 1', 
            email: 'user2@test.com',
            password: "123"
        };


        await expect(userUpdateService.execute(38, user1)).rejects.toEqual(new AppError("Usuario nao encontrado"))

    })
})
