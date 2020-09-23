const connection = require("../../database/connection")
const transporter = require("../../mailer/mailer")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports =  {
    async index(request, response){
        const {search} = request.params;

        if(search) {
            const users = await connection('tb_users')
                                    .select('id','name','email','aproved','typeUser',connection.raw("CASE WHEN typeUser = 1 THEN 'Administrador' WHEN typeUser = 2 THEN 'Comum' ELSE 'Tipo não definido' END AS typesUser"))
                                    .where('name','like',`%${search}%`)
                                    .orWhere('email','like',`%${search}%`)
                                    .orWhere('typesUser','like',`%${search}%`);

            return response.json(users)
        }else{
            const users = await connection('tb_users')
                                    .select('id','name','email','aproved','typeUser',connection.raw("CASE WHEN typeUser = 1 THEN 'Administrador' WHEN typeUser = 2 THEN 'Comum' ELSE 'Tipo não definido'  END AS typesUser"));
                                    
            return response.json(users)
        }

    },

    /*--------------------------------------------------*/

    async user(request, response){

        const {id} = request.params;

        const users = await connection('tb_users').select('id','name','email','aproved','typeUser',connection.raw("CASE WHEN typeUser = 1 THEN 'Administrador' WHEN typeUser = 2 THEN 'Comum' ELSE 'Tipo não definido'  END AS typesUser"))
                                                    .where('id',id);

        return response.json(users);
    },

    /*--------------------------------------------------*/

    async firstAccess(request, response){
        
        const {name, email, pass} = request.body;

        const [exists] = await connection('tb_users').where('name','like',name).orWhere('email','like',email).count();

        console.log(exists['count(*)'])

        if (exists['count(*)'] > 0) {
            return response.status(304).send('Usuário já existe');
        } else {

            bcrypt.hash(pass, 10, async function(errBcrypt, hash){
                if (errBcrypt) { return response.status(500).send({error: errBcrypt})}
                console.log(`${name}, ${email}, ${hash}`)
                const teste = await connection('tb_users').insert({
                    'name': name,
                    'email': email,
                    'typeUser': 2,
                    'pass': hash,
                    'aproved': 0,
                    'modifyPass': 0
                });
                return response.json(teste);
            });            
        }
    },

    /*--------------------------------------------------*/

    async create(request, response){
        
        const {name, email, typeUser} = request.body;
        const pass = Math.random().toString(36).slice(-10);
        
        const [value] = await connection('tb_users')
                                .where('name','like',name)
                                .orWhere('email','like',email)
                                .count();
        
        var [user] = "";

        if(value['count(*)'] > 0){

            return response.status(304).send('Usuário já existe')

        }else{

            bcrypt.hash(pass, 10, async function(errBcrypt, hash){
                if (errBcrypt) { return response.status(500).send({error: errBcrypt})}
                const teste = await connection('tb_users').insert({
                    'name': name,
                    'email': email,
                    'typeUser': typeUser,
                    'pass': hash,
                    'aproved': 0,
                    'modifyPass': 0
                });
                return response.json(teste);
            }); 
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
        
        await connection('tb_users').where('id', id).delete({id});

        response.json("Excluido");
        
    },

    /*--------------------------------------------------*/

    async aproved(request, response){

        const {id} = request.params;

        await connection('tb_users').update('aproved',1).where('id',id);

        response.json('Aprovado');

    },

    /*--------------------------------------------------*/

    async resetPass(request, response){

        const {id} = request.params;

        const pass = Math.random().toString(36).slice(-10);

        bcrypt.hash(pass, 10, async function(errBcrypt, hash){
            if (errBcrypt) { return response.status(500).send({error: errBcrypt})}
            const teste = await connection('tb_users').update({'pass': hash, 'modifyPass': 1}).where('id',id);
            response.json('Senha atualizada');
        })
    },

    /*--------------------------------------------------*/

    async login(request, response){
        
        const {email, pass} = request.body;

        const [value] = await connection('tb_users')
                                .where('email',email)
                                .select('*')
                                .count();

        if(value['count(*)'] > 0){
            console.log(value['pass'])
            bcrypt.compare(pass, value['pass'], (errBcrypt, result) => {
                if (errBcrypt) { 
                    return response.status(401).send('Senha incorreta') 
                }
                if (result) {
                    const token = jwt.sign({
                        id_user: value['id'],
                        name_user: value['name'],
                        type_user: value['typeUser']
                    },
                    'secret',
                    {
                        expiresIn: '1h'
                    });                    
                    return response.json(token)
                } 
                return response.status(400).send('Senha incorreta')                
            }); 

        }else{
            return response.status(400).send('Usuário não existe')
        }    
    }
}
