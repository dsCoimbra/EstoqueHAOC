const connection = require("../../database/connection")

module.exports =  {

    async index(request,response){
        const sectors = await connection('tb_sectors')
                                .select('tb_sectors.name as Nome','tb_sectors.costcenter as `Centro de Custo`');
        
        return response.json(sectors)

    },

    /*--------------------------------------------------*/

    async sector(request, response){

    },

    /*--------------------------------------------------*/

    async create(request,response){
        const {name, costCenter} = request.body;
        
        const [value] = await connection("tb_sectors").where('name', name).orWhere('costCenter',costCenter).count();

        var [sector] = ""

        if(value['count(*)'] > 0){

            sector = "Item ja existe"

        }else{

            const [id] = await connection('tb_sectors').insert({
                name: name
            })
            
            sector = await connection('tb_sectors').select('*').where('id',id)

        }

        return response.json({sector})    
        
    },

    /*--------------------------------------------------*/

    async edit(request,response){
        const {name, costCenter} = request.body;
        const {id} = request.params;
        
        await connection('tb_sectors')
                                .where('id', id)
                                .update({
                                    name: name,
                                    costCenter: costCenter})
        
        const [sector] = await connection('tb_sectors')
                            .select('*')
                            .where('id',id)

        return response.json({sector})
        
    },

    /*--------------------------------------------------*/

    async delete(request,response){

        const {id} = request.params;
        
        await connection('tb_sectors').where('id', id).delete({id})

        response.json("Excluido")
    }
}


