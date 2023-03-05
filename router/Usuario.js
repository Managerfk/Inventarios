const { Router } = require('express'); // se importa la funcionalidad router.

const Usuario = require('../models/Usuario');//Se importa el modelo de usuario desde la carpeta modelos


const router = Router();

router.post('/', async function(req,res){
    try{

        //Validar si el email ya existe
        const existeUsuario = await Usuario.findOne({email: req.body.email});
        if(existeUsuario){
            return res.send('Email ya existe')
        }
        //------------------------------------------------//

        //Creación de usuario nuevo a traves del método post 
        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();//Guardamos los datos del usuario--- inserta a la base de datos.

        res.send(usuario);// envia la visualización al cliente de los datos almacenados

    }catch(error){
        console.log(error)
        res.send('Error al crear el usuario');
    }
});

router.get('/', async function(req,res){
    try{
        const usuarios = await Usuario.find();//trae todos los usuarios en la base de datos
        res.send(usuarios);

        
    }catch(error){
        console.log(error);
        res.send('Error al visualizar los usuarios');
    }

});

router.put('/:usuarioId', async function(req,res){
    try{
        //Validar si el usuario existe
        let usuario = await Usuario.findById(req.params.usuarioId );
        if(!usuario){
            return res.send('usuario no existe')
        };
        //------------------------------------------------//

        //Validación Email
        const existeUsuario = await Usuario.findOne({email: req.body.email, _id: {$ne: usuario._id}});
        if(existeUsuario){
            return res.send('Email ya existe')
        };
        //actualización de usuario nuevo a traves del método Put 

        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();//Guardamos los datos del usuario--- inserta a la base de datos.

        res.send(usuario);// envia la visualización al cliente de los datos almacenados

    }catch(error){
        console.log(error);
        res.send('Error al actualizar el usuario');
    }
});

module.exports = router;