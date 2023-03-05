const { Router } = require ('express'); // se importa la funcionalidad router.

const Inventario = require('../models/Inventario');// importamos el schema de inventarios

const {validarInventario, validadInventario} = require('../helpers/validarInventario');


const router = Router();

router.post('/', async function(req,res){
    try{

        const validaciones = validadInventario(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones)
        };


        //Validar serial
        const existeSerial = await Inventario.findOne({serial: req.body.serial});
        if(existeSerial){
            return res.send('serial ya existente en otro equipo')
        }
        //-----------------

        //creación de nuevo ingreso de inventario
        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.model = req.body.model;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;

        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;

        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();//Guardamos los datos del inventario--- inserta a la base de datos.

        res.send(inventario);// envia la visualización al cliente de los datos almacenados

        
    }catch(error){
        console.log(error);
        res.send('Error al crear inventario')
    }

});

router.get('/', async function(req,res){
    try{
        //trae todos los usuarios en la base de datos
        const inventarios = await Inventario.find().populate([
            {
                path:'usuario'
            },
            {
                path:'marca'
            },
            {
                path:'tipoEquipo'
            },
            {
                path:'estadoEquipo'
            }

        ]);
        res.send(inventarios);

        
    }catch(error){
        console.log(error);
        res.send('Error al visualizar los inventarios');
    }
});

router.put('/:inventarioId', async function(req,res){
    try{

        const validaciones = validadInventario(req);
        if(validaciones.length > 0){
            return res.status(400).send(validaciones)
        };

        //Validar inventario existe
        let inventario = await Inventario.findById(req.params.inventarioId );
        if(!inventario){
            return res.send('inventario no existe')
        };

        //Validar serial
        const existeSerial = await Inventario.findOne({serial: req.body.serial,_id: {$ne: inventario._id}});
        if(existeSerial){
            return res.send('serial ya existente en otro equipo')
        }
        //-----------------

        //actualizacion de nuevo ingreso de inventario
        inventario.serial = req.body.serial;
        inventario.model = req.body.model;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;

        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;

        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();//Guardamos los datos del inventario--- inserta a la base de datos.

        res.send(inventario);// envia la visualización al cliente de los datos almacenados

        
    }catch(error){
        console.log(error);
        res.send('Error al crear inventario')
    }
});

module.exports = router;