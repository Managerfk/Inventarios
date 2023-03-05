const { Router } = require ('express'); // se importa la funcionalidad router.

const Marca = require('../models/Marca');//Se importa el modelo marca

const router = Router();

router.post('/', async function(req,res){
    try{

        //Creación de marca nueva a traves del método post 
        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();//Guardamos los datos de la marca

        res.send(marca);// envia la visualización al cliente de los datos almacenados

    }catch(error){
        console.log(error);
        res.send('Error al crear nueva marca');
    }

});

router.get('/', async function(req,res){
    try{
        const marcas = await Marca.find();//trae todas las marcas en la base de datos
        res.send(marcas);

        
    }catch(error){
        console.log(error);
        res.send('Error al visualizar las marcas');
    }

});

router.put('/:marcaId', async function(req,res){
    try{

        //Verificar si la marca existe o no
        let marca = await Marca.findById(req.params.marcaId );
        if(!marca){
            return res.send('La marca no existe');
        };
        //---------

        //actualización de marca nueva a traves del método Put 
        marca.nombre = req.body.nombre; 
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();

        marca = await marca.save();//Guardamos los datos de la marca

        res.send(marca);// envia la visualización al cliente de los datos almacenados

    }catch(error){
        console.log(error);
        res.send('Error al actualizar la marca');
    }
});

module.exports = router;