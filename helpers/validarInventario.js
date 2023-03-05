
const validadInventario = (req) =>{
    const validaciones = [];

    if(!req.body.serial){
        validaciones.push('El serial es requerido')
    }

    if(!req.body.model){
        validaciones.push('El modelo es requerido')
    }

    if(!req.body.descripcion){
        validaciones.push('La descripción es requerida')
    }

    if(!req.body.color){
        validaciones.push('El color es requerido')
    }

    if(!req.body.foto){
        validaciones.push('La foto es requerida')
    }

    if(!req.body.fechaCompra){
        validaciones.push('La fecha de compra es requerida')
    }

    if(!req.body.precio){
        validaciones.push('El precio es requerido')
    }

    if(!req.body.usuario){
        validaciones.push('El usuario es requerido')
    }

    if(!req.body.marca){
        validaciones.push('la marca es requerida')
    }

    if(!req.body.tipoEquipo){
        validaciones.push('El tipo de equipo es requerido')
    }

    if(!req.body.estadoEquipo){
        validaciones.push('El estado del equipo es requerido')
    }

    return validaciones
};

module.exports = {
    validadInventario,
};