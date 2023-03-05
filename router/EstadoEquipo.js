const { Router } = require ('express'); // se importa la funcionalidad router.

const EstadoEquipo = require('../models/EstadoEquipo');//importamos el esquema de estado de equipo


const router = Router();

router.post('/', async function(req,res){
    try{
        //Creación de estado de equipo nuevo a traves del método post 
        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();//Guardamos el estado de tipo de equipo

        res.send(estadoEquipo);// envia la visualización al cliente de los datos almacenados

    }catch(error){
        console.log(error);
        res.send('Error al crear estado de equipo');
    }
});

router.get('/', async function(req,res){
    try{
        const estadoEquipos = await EstadoEquipo.find();//trae todas las marcas en la base de datos
        res.send(estadoEquipos);

        
    }catch(error){
        console.log(error);
        res.send('Error al visualizar los estados de equipos');
    }
});

router.put('/:estadoEquipoId', async function(req,res){
    try{
        //validar si existe o no el estado
        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId );
        if(!estadoEquipo){
            return res.send('Este estado no existe');
        };


        //actualización de estado de equipo nuevo a traves del método put 
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();//Guardamos el estado de estado de equipo

        res.send(estadoEquipo);// envia la visualización al cliente de los datos almacenados

    }catch(error){
        console.log(error);
        res.send('Error al actualizar el estado de equipo');
    }
});

module.exports = router;