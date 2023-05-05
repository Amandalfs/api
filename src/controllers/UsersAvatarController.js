const DiskStorage = require('../providers/diskStorage');
const diskStorage = new DiskStorage;
const db = require('../database/knex');
const appError = require('../utils/AppError');

class UsersAvatarController {
    async update(req, res){
        const user_id = req.user.id

        const avatarFileName = req.file.filename;
        const user = await db('users').where({id: user_id}).first();
        
        if(!user){
            throw new appError("Somente usuarios autenticados podem mudar a foto", 401);
        }

        if(user.avatar){
            await diskStorage.deleteFile(user.avatar);
        }

        const filename = await diskStorage.salveFile(avatarFileName);
        user.avatar = filename;

        await db('users').update(user).where({id:user_id});

        return res.json(user)
    }
}

module.exports = UsersAvatarController;