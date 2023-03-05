const mongoose = require('mongoose'); //se importa mongoose

//Función para conectarse, se hace una cadena de conexión
const getConnection = async() =>{

    try{
        const url = 'mongodb://juanhoyos:1040183656@ac-hharhmq-shard-00-00.vbvllhk.mongodb.net:27017,ac-hharhmq-shard-00-01.vbvllhk.mongodb.net:27017,ac-hharhmq-shard-00-02.vbvllhk.mongodb.net:27017/Clusteriudigital?ssl=true&replicaSet=atlas-s8uole-shard-0&authSource=admin&retryWrites=true&w=majority'
        //url de conexión tomada desde mongo db atlas, ofrecido por conexión del cluster
        await mongoose.connect(url);

        console.log('Conexión Exitosa');
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    getConnection,
}