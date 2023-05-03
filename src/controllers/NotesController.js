const db = require("../database/knex");

class NotesController{
    async create(req, res){
        const { title, description, tags, links} = req.body

        const { user_id } = req.params;
        
        const [ note_id ] =  await db('notes').insert({
            title,
            description,
            user_id
        });

        const linksInsert = links.map(link=>{
            return{
                note_id,
                url: link
            }
        })

        await db('links').insert(linksInsert);

        const tagsInsert = tags.map(name=>{
            return{
                note_id,
                name, 
                user_id
            }
        })

        await db('tags').insert(tagsInsert);

        res.json();
    }
}

module.exports = NotesController;