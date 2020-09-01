const connection = require("../../database/connection");

module.exports = {

    async index(request, response){
        const providers = await connection('tb_providers')
                                    .select('tb_providers.name as Fornecedor','tb_providers.id as ID');        
        
        return response.json(providers)
    },

    /*--------------------------------------------------*/

    async provider(request, response){

    },

    /*--------------------------------------------------*/

    async create(request, response){

        const {name, idService} = request.body;

        const [value] = await connection("tb_providers").where('name', name).count();

        console.log(value)

        var [provider] = ""

        if(value['count(*)'] > 0){

            provider = "Item ja existe"

        }else{

            const [idProvider] = await connection('tb_providers').insert({
                name
            });
    
            await connection('tb_services_provider_has_provider').insert({
                idProvider,
                idService
            })
    
            provider = await connection('tb_providers')
                                        .innerJoin('tb_services_provider_has_provider','tb_providers.id','tb_services_provider_has_provider.idProvider')
                                        .innerJoin('tb_services_provider','tb_services_provider_has_provider.idService','tb_services_provider.id')
                                        .select('tb_providers.name as Fornecedor','tb_services_provider.name as Material')
                                        .where('tb_providers.id',idProvider)

        }
        
        return response.json({ provider })
    },

    /*--------------------------------------------------*/

    async edit(request, response){

        const {name} = request.body;
        const {id} = request.params;

        connection('tb_providers').where('id', id).update({'name': name})

        response.json({ name })

        const [providers] = await connection('tb_providers')
                                    .innerJoin('tb_services_provider_has_provider','tb_providers.id','tb_services_provider_has_provider.idProvider')
                                    .innerJoin('tb_services_provider','tb_services_provider_has_provider.idService','tb_services_provider.id')
                                    .select('tb_providers.name as Fornecedor','tb_services_provider.name as Material')
                                    .where('tb_providers.id',id)


        return response.json({ providers })

    },

    /*--------------------------------------------------*/

    async delete(request, response){

        const {id} = request.params;
        
        await connection('tb_providers').where('id', id).delete({id})

        response.json("Excluido")

    }

}