const connection = require("../../database/connection");

require("../Services")

module.exports =  {

    async index(request, response){

        const categories = await connection('tb_categories').select('id','name');

        return response.json( categories );

    },

    /*--------------------------------------------------*/

    async category(request, response){
        
        const {id} = request.params;

        const categories = await connection('tb_categories').select('name').where('id', id)

        return response.json(categories);

    }, 

    /*--------------------------------------------------*/

    async create(request, response){

        const {name} = request.body;

        const [value] = await connection("tb_categories").where('name',name).count();

        var [category] = "";

        if(value['count(*)'] > 0){

            category = "Item ja existe";

        }else{

            const [id] = await connection('tb_categories').insert({
                name: name
            })

            category = await connection('tb_categories').select('*').where('id',id);

        }

        return response.json({category});      
    },

    /*--------------------------------------------------*/

    async edit(request, response){

        const {name} = request.body;

        const {id} = request.params;

        const [value] = await connection('tb_categories').where('name',name).count();

        var [category] = "";

        if(value["count(*)"] > 0){

            category = "Categoria " + name + " ja existe"

        }else{

            await connection('tb_categories').where('id',id).update('name',name)

            category = await connection('tb_categories').select('*').where('id',id);
            
        }
        
        return response.json({category})
    },

    /*--------------------------------------------------*/

    async delete(request, response){

        const {id} = request.params;
        
        await connection('tb_categories').where('id', id).delete({id})

        response.json("Excluido")
        
    }
}
