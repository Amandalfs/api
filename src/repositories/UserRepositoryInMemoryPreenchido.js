class UserRepositoryInMemoryPreenchido{
    users = [
        {
            name: "User test",
            email: "user@test.com",
            password: "$2b$08$YSz8RyfmpFzE/Oz9J91e7.NNnq1ZIZtrA4w9v1K22AUheZio0BeH6", //"12345678"
            id: 3,
        },
        {
            name: "User2 test",
            email: "user2@test.com",
            password: "$2b$08$YSz8RyfmpFzE/Oz9J91e7.NNnq1ZIZtrA4w9v1K22AUheZio0BeH6", //"12345678"
            id: 5,
        },
    ];

    async createUser({ email, name, password}) {
        const user = {
            id: Math.floor(Math.random()*1000)+1,
            name, 
            email, 
            password
        }

        this.users.push(user);

        return user;
    }

    async findByEmail(email){
        return this.users.find(user=> user.email === email);
    }

    async findById(id){
        return this.users.find((user, index)=>{
            if(user.id===id){
                return user;
            }
        })
    }

    async updateUser(id, data){
        return this.users.find((user, index)=>{
            if(user.id===id){
                this.users[index] = data;
                return this.users[index];
            }
        })
    }
}

module.exports = UserRepositoryInMemoryPreenchido;