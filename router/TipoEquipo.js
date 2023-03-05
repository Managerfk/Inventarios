const { Router } = require ('express'); // se importa la funcionalidad router.

const TipoEquipo = require('../models/TipoEquipo');//importamos tipo de equipo


const router = Router();

router.post('/', async function(req,res){
    try{

        //Creación de tipos de equipo nuevo a traves del método post 
        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();//Guardamos los datos de tipo de equipo

        res.send(tipoEquipo);// envia la visualización al cliente de los datos almacenados

    }catch(error){
        console.log(error);
        res.send('Error al crear Tipo de equipo');
    }


});

router.get('/', async function(req,res){
    try{
        const tipoEquipos = await TipoEquipo.find();//trae todas las marcas en la base de datos
        res.send(tipoEquipos);

        
    }catch(error){
        console.log(error);
        res.send('Error al visualizar los tipos de equipos');
    }

});

router.put('/:tipoEquipoId', async function(req,res){
    try{
        //validar si existe o no el tipo
        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId );
        if(!tipoEquipo){
            return res.send('Este tipo no existe');
        };

        //actualización de tipos de equipo nuevo a traves del método post 
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();//Guardamos los datos de tipo de equipo

        res.send(tipoEquipo);// envia la visualización al cliente de los datos almacenados

    }catch(error){
        console.log(error);
        res.send('Error al actualizar Tipo de equipo');
    }
});

module.exports = router;