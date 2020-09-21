const connection = require("../database/connection")

module.exports =  {
    async index(request, response){

        const {search} = request.params;

        if (search) {
            const maintenances = await connection('tb_maintenances')
                                        .select(
                                            'tb_maintenances.equipment as equipment',
                                            'tb_maintenances.heritage as heritage',
                                            'tb_sectors.name as sector',
                                            'tb_maintenances.requestInternal as requestInternal',
                                            'tb_maintenances.requestExternal as requestExternal',
                                            'tb_maintenances.date as date',
                                            connection.raw("CASE WHEN tb_maintenances.statusMaintenance = 1 THEN 'Aberto - Aguardando retirada' WHEN tb_maintenances.statusMaintenance = 2 THEN 'Item retirado - Aguardando orçamento' WHEN tb_maintenances.statusMaintenance = 3 THEN 'Orçamento Aprovado - Aguardando entrega' WHEN tb_maintenances.statusMaintenance = 4 THEN 'Item devolvido - Entregue ao responsável' ELSE 'Serviço cancelado' AS status"))
                                        .innerJoin('tb_sectors','tb_maintenances.idSector','tb_sectors.id')
                                        .where('equipment',search)
                                        .orWhere('heritage',search)
                                        .orWhere('sector',search)
                                        .orWhere('requestInternal',search)
                                        .orWhere('requestExternal',search)
                                        .orWhere('date',search)
                                        .orWhere('status',search);

        return response.json(maintenances);      

        }else{
            const maintenances = await connection('tb_maintenances')
                                        .select(
                                            'tb_maintenances.equipment as equipment',
                                            'tb_maintenances.heritage as heritage',
                                            'tb_sectors.name as sector',
                                            'tb_maintenances.requestInternal as requestInternal',
                                            'tb_maintenances.requestExternal as requestExternal',
                                            'tb_maintenances.date as date',
                                            connection.raw("CASE WHEN tb_maintenances.statusMaintenance = 1 THEN 'Aberto - Aguardando retirada' WHEN tb_maintenances.statusMaintenance = 2 THEN 'Item retirado - Aguardando orçamento' WHEN tb_maintenances.statusMaintenance = 3 THEN 'Orçamento Aprovado - Aguardando entrega' WHEN tb_maintenances.statusMaintenance = 4 THEN 'Item devolvido - Entregue ao responsável' ELSE 'Serviço cancelado' AS status"))
                                        .innerJoin('tb_sectors','tb_maintenances.idSector','tb_sectors.id');
            
            return response.json(maintenances);
        }

    },

    /*--------------------------------------------------*/

    async maintenance(request, response){

        const {id} = request.params;

        const loanExists = await connection('tb_loan').where('idMaintenance',id).cont();

        if (loanExists) {
            const maintenance = await connection('tb_maintenances')
                                        .select(
                                            'tb_maintenances.internalRequest as internalRequest',
                                            'tb_maintenances.externalRequest as externalRequest',
                                            'tb_maintenances.date as date',
                                            'tb_providers.name as nameProvider',
                                            'tb_providers.id as idProvider',
                                            'tb_maintenances.heritage as heritage',
                                            'tb_maintenances.model as model',
                                            'tb_maintenances.equipment as equipment',
                                            'tb_maintenances.serialNumber as serialNumber',
                                            'tb_sectors.id as sector',
                                            connection.raw("CASE WHEN tb_maintenances.statusMaintenance = 1 THEN 'Aberto - Aguardando retirada' WHEN tb_maintenances.statusMaintenance = 2 THEN 'Item retirado - Aguardando orçamento' WHEN tb_maintenances.statusMaintenance = 3 THEN 'Orçamento Aprovado - Aguardando entrega' WHEN tb_maintenances.statusMaintenance = 4 THEN 'Item devolvido - Entregue ao responsável' ELSE 'Serviço cancelado' AS status",
                                            'tb_maintenances.problem as problem',
                                            "'1' AS loanExists",
                                            'tb_categories.name as category',
                                            'tb_workstations.heritage as loanHeritage',
                                            'tb_workstations.serialNumber as loanSerialNumber',
                                            'tb_models.name as loanModel'))
                                        .innerJoin('tb_providers','tb_providers.id','tb_maintenances.idProvider')
                                        .innerJoin('tb_sectors','tb_maintenances.idSector','tb_sectors.id')
                                        .innerJoin('tb_equipments','tb_maintenances_idEquipment','tb_equipments_id')
                                        .innerJoin('tb_models','tb_equipments.idModel','tb_model.id')
                                        .innerJoin('tb_categories','tb_categories.id','tb_equipments.idCategory')
                                        .innerJoin('tb_workstations','tb_equipments.id','tb_workstations.idEquipment')
        }

    },

    /*--------------------------------------------------*/

    async create(request, response){
        
    },

    /*--------------------------------------------------*/

    async edit(request, response){
        
    },

    /*--------------------------------------------------*/
    
    async delete(request, response){
        
    }
}