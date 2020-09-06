const connection = require("../../database/connection")

module.exports =  {

    async index(request,response){
        const {search} = request.params;

        if(search){

            const sectors = await connection('tb_sectors')
                                .select('*')
                                .where('id','like',`%${search}%`)
                                .orWhere('name','like',`%${search}%`)
                                .orWhere('costCenter','like',`%${search}%`);
        
            return response.json(sectors)

        }else{

            const sectors = await connection('tb_sectors')
                                .select('*')

            return response.json(sectors)

        }
    },

    /*--------------------------------------------------*/

    async sector(request, response){

        const {id} = request.params;

        const sectors = await connection('tb_sectors').select('name','costCenter').where('id',id);

        response.json(sectors)

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
                name: name,
                costCenter: costCenter
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


