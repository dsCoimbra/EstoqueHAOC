const connection = require("../../database/connection")
const transporter = require("../../mailer/mailer")

module.exports =  {
    async index(request, response){
        const {search} = request.params;

        if(search) {
            const users = await connection('tb_users')
                                    .select('id','name','email','aproved',connection.raw("CASE WHEN typeUser = 1 THEN 'Administrador' WHEN typeUser = 2 THEN 'Comum' ELSE 'Tipo não definido'  END AS typeUser"))
                                    .where('name','like',`%${search}%`)
                                    .orWhere('email','like',`%${search}%`)
                                    .orWhere('typeUser','like',`%${search}%`);

            return response.json(users)
        }else{
            const users = await connection('tb_users')
                                    .select('id','name','email','aproved',connection.raw("CASE WHEN typeUser = 1 THEN 'Administrador' WHEN typeUser = 2 THEN 'Comum' ELSE 'Tipo não definido'  END AS typeUser"));
                                    
            return response.json(users)
        }

    },

    /*--------------------------------------------------*/

    async user(request, response){

        const {id} = request.params;

        const users = await connection('tb_users').select('id','name','email','aproved',connection.raw("CASE WHEN typeUser = 1 THEN 'Administrador' WHEN typeUser = 2 THEN 'Comum' ELSE 'Tipo não definido'  END AS typeUser"))
                                                    .where('id',id);

        return response.json(users);
    },

    /*--------------------------------------------------*/

    async create(request, response){
        
        const {name, email, typeUser} = request.body;
        
        const [value] = await connection('tb_users')
                                .where('name','like',name)
                                .orWhere('email','like',email)
                                .count();
        
        var [user] = "";

        if(value['count(*)'] > 0){

            return response.status(304).send('Categoria já existe')

        }else{

            const [id] = await connection('tb_users').insert({
                'name': name,
                'email': email,
                'typeUser': typeUser,
                'pass': Math.random().toString(36).slice(-10),
                'aproved': 0,
                'modifyPass': 0
            })

            user = await connection('tb_users').select('id',
                                                        'name',
                                                        'email',
                                                        'aproved',
                                                        connection.raw("CASE WHEN typeUser = 1 THEN 'Administrador' WHEN typeUser = 2 THEN 'Comum' ELSE 'Tipo não definido' END AS typeUser"))
                                                .where('id',id);

            return response.json(user);
        }    
    },

    /*--------------------------------------------------*/

    async edit(request, response){

        const {name, email, typeUser} = request.body;

        const {id} = request.params;

        await connection('tb_users').update({
                                        'name': name,
                                        'email': email,
                                        'typeUser': typeUser
                                    })
                                    .where('id',id)

        user = await connection('tb_users').select('id',
                                                    'name',
                                                    'email',
                                                    'aproved',
                                                    connection.raw("CASE WHEN typeUser = 1 THEN 'Administrador' WHEN typeUser = 2 THEN 'Comum' ELSE 'Tipo não definido' END AS typeUser"))
                                            .where('id',id);

        return response.json(user);   
        
    },

    /*--------------------------------------------------*/
    
    async delete(request, response){

        const {id} = request.params;
        
        await connection('tb_users').where('id', id).delete({id})

        response.json("Excluido")
        
    }
}
