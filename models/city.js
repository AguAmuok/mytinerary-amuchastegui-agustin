const mongoose = require('mongoose') //requiero el metodo mongoose

const citySchema  = new mongoose.Schema({ //creamos un nuevo esquema de mongoose
    name:{type:String, required:true}, // le pasamos un objeto con los nombres de las propiedades y las caracteristicas de cada una 
    country:{type:String, required:true},
    image:{type:String, required:true},
    description:{type:String, required:true}
})
const City = mongoose.model('cities', citySchema) // usamos el metodo que crea un modelo al cual le paso dos parametros => el nombre de la coleccion y el esquema


module.exports = City //exportamos el modelo