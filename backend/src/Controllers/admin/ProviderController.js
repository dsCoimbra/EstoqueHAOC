const connection = require("../../database/connection");

module.exports = {

    async index(request, response){
        const {search} = request.params;

        if (search){
            const providers = await connection('tb_providers')
                                .select(
                                    "id",
                                    "name",
                                    connection.raw("CASE WHEN services = '1' THEN 'Material' WHEN services = '2' THEN 'Manutenção' ELSE 'Material e Manutenção' END AS servicos"))
                                .where('name','like',`%${search}%`)
                                .orWhere('servicos','like',`%${search}%`);
            
            return response.json(providers);
        }else{

            const providers = await connection('tb_providers')
                                    .select(
                                        "id",
                                        "name",
                                        connection.raw("CASE WHEN services = '1' THEN 'Material' WHEN services = '2' THEN 'Manutenção' ELSE 'Material e Manutenção' END AS servicos"));
            
            return response.json(providers)
        }
    },

    /*--------------------------------------------------*/

    async provider(request, response){

        const {id} = request.params;

        const providers = await connection('tb_providers')
                                    .select(
                                        "name",
                                        "services")
                                    .where('id',id);
        
        return response.json(providers);
    },

    /*--------------------------------------------------*/

    async create(request, response){

        const {name, services} = request.body;

        const [value] = await connection("tb_providers").where('name', name).count();

        console.log(value)

        var [provider] = ""

        if(value['count(*)'] > 0){

            return response.status(304).send('Categoria já existe')

        }else{

            const [id] = await connection('tb_providers')
                .insert({
                    'name':name, 
                    'services':services
                });
            
            provider = await connection('tb_providers').select('*').where('id',id)

            return response.json({ provider })
        }
        
       
    },

    /*--------------------------------------------------*/

    async edit(request, response){

        const {name, services} = request.body;
        const {id} = request.params;

        await connection('tb_providers')
                                    .update({
                                            name :name,
                                            services: services})
                                    .where('id',id);
        
        const [providers] = await connection('tb_providers')
                                    .select('*')
                                    .where('id',id)


        return response.json({providers})

    },

    /*--------------------------------------------------*/

    async delete(request, response){

        const {id} = request.params;
        
        await connection('tb_providers').where('id', id).delete({id})

        response.json("Excluido")

    }

}