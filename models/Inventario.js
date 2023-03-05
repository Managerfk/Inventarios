const Usuario = require("./Usuario");
const Marca = require("./Marca");
const TipoEquipo = require("./TipoEquipo");
const EstadoEquipo = require("./EstadoEquipo");

const {Schema, model} = require('mongoose'); //Se importa dos funciones fundamentales para que funcione de mongoose

const InventarioSchema = Schema({
    serial: { type: String, require: true, unique: true},
    model: { type: String, require: true},
    descripcion: { type: String, require: true},
    color: { type: String, require: true},
    foto: { type: String, require: true },//String será una url
    fechaCompra: { type: Date, require: true},
    precio: { type: Number, require: true},
    //Relación con tablas con las que se realizaron anteriormente

    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', require: false},//Referencia al modelo usuario ya creado.
    marca: { type: Schema.Types.ObjectId, ref: 'Marca', require: true},
    tipoEquipo: { type: Schema.Types.ObjectId, ref:'TipoEquipo', require: true},
    estadoEquipo: { type: Schema.Types.ObjectId, ref: 'EstadoEquipo', require: true},

    //Estados servidor
    fechaCreacion : { type: Date, require: true},
    fechaActualizacion: {type: Date, require: true}

});

module.exports = model('Inventario', InventarioSchema);