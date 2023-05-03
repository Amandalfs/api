const db = require('../database/knex');

class TagsController {
    async index(req, res){
        const { user_id } = req.params;

        const tags = await db('tags')
        .where({user_id})

        return res.json({tags})
    }
}

module.exports = TagsController;