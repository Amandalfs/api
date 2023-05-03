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

    async show(req, res){
        const { id } = req.params;

        const note = await db('notes').where({ id }).first()
        const tags = await db('tags').where({note_id: id}).orderBy('name');
        const links = await db('links').where({note_id: id}).orderBy('created_at');
        return res.json({  
            note,
            tags,
            links
        })
    }

    async delete(req, res){
        const { id } = req.params;

        await db('notes').where({id}).delete();

        return res.json();
    }

    async index(req, res){
        const { user_id, title, tags } = req.query;

        let notes;

        if(tags){
            const filterTags = tags.split(',').map(tag => tag.trim());

            notes = await db('tags')
            .select([
                "notes.id",
                "notes.title",
                "notes.user_id"
            ])
            .where("notes.user_id", user_id)
            .whereLike("notes.title", `%${title}%`)
            .whereIn("name", filterTags)
            .innerJoin("notes", "notes.id", "tags.note_id")
            .orderBy('title');
        }else {
            notes = await db('notes')
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy('title');
            
        }
        const userTags = await db('tags').where({ user_id });
        const notesWithTags = await notes.map(note=>{
            const noteTags = userTags.filter(userTag => userTag.note_id === note.id)

            return {
                ...note, 
                tags: noteTags
            }
        })

        return res.json({notesWithTags});
    }
}

module.exports = NotesController;