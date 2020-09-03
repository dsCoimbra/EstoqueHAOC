const connection = require("../../database/connection");

require("../Services")

module.exports =  {

    async index(request, response){

        const {search} = request.params;  
        
        console.log(search)

        if(search){
            const categories = await    connection('tb_categories')
                                        .select('*')
                                        .where('name','like',`%${search}%`)
                                        .orWhere('id','like',`%${search}%`)

            return response.json(categories);

        }else{

            const categories = await connection('tb_categories').select('*')

            return response.json(categories);
        }

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

        const [value] = await connection("tb_categories").where('name','like',name).count();

        var [category] = "";

        if(value['count(*)'] > 0){

            return response.status(304).send('Categoria já existe')

        }else{

            const [id] = await connection('tb_categories').insert({
                name: name
            })

            category = await connection('tb_categories').select('*').where('id',id);

            return response.json(category);

        }

              
    },

    /*--------------------------------------------------*/

    async edit(request, response){

        const {name} = request.body;

        const {id} = request.params;

        const [value] = await connection('tb_categories').where('name',name).count();

        var [category] = "";

        if(value["count(*)"] > 0){

            return response.status(304).send('Categoria já existe')

        }else{

            await connection('tb_categories').where('id',id).update('name',name)

            category = await connection('tb_categories').select('*').where('id',id);
            
            return response.json({category})
            
        }
        
        
    },

    /*--------------------------------------------------*/

    async delete(request, response){

        const {id} = request.params;
        
        await connection('tb_categories').where('id', id).delete({id})

        response.json("Excluido")
        
    }
}
