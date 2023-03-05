const {Schema, model} = require('mongoose'); //Se importa dos funciones fundamentales para que funcione de mongoose

//Se crea un objeto de tipoEquipo Schema con cadaa uno de los atributos o campos.
const TipoEquipoSchema = Schema({
    nombre: { type: String, require: true}, //'NombreAtributo': { TipoDato: , Requerido: true or false}
    estado: { type: String, require: true, enum: ['Activo','Inactivo']},// {Enumerable: datos requeridos}
    fechaCreacion: { type: Date, require: true,},
    FechaActualizacion: { type: Date, require: true}

    //Los datos anteriores serán administrados por la aplicación

});

module.exports = model('TipoEquipo', TipoEquipoSchema);