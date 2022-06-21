const City = require('../models/city') //requerimos el modelo

const citiesControllers = { //definimos un objeto con los controladores del modelo

    getCities: async (req, res) => { //funcion asincrona que creara un trabajo
        let cities //definimos las variables
        let error = null // definimos el error, que en primer instancia sera nulo
        try { //utilizamos el constructor de modelos
            cities = await City.find() // esperamos esa creacion y el metodo .FIND encuentra
        } catch (err) { error = err } // cachamos el error en caso de tener uno 
        res.json({
            response: error ? 'ERROR' : { cities }, //respuestas segun lo que suceda
            success: error ? false : true,
            error: error
        })
    },
    getOneCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null
        try {
            city = await City.findOne({ _id: id }) 
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : { city },
            success: error ? false : true,
            error: error
        })
    }
    ,
    addCity: async (req, res) => {
        const { name, country, image } = req.body.data
        let city
        let error = null
        try {
            city = await new City({
                name: name,
                country: country,
                image: image,
                description: description
            }).save()
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error: error
        })
    },
    
    modifyCity: async (req, res) => {
        const id = req.params.id
        const city = req.body
        let citydb
        let error = null
        try {
            citydb = await City.findOneAndUpdate( //el metodo .findeOneAndUpdate requiere tres parametros
                { _id: id }, //el parametro necesario para el modelo que tiene que encontrar
                city,// la modificacion que vamos a pasar en body
                { new: true }) //y esta opcion en true que "cambia" el modelo viejo por el actualizado (en caso de false: crea un modelo nuevo con la modificacion)
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : citydb,
            success: error ? false : true,
            error: error
        })
    },

    removeCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null
        try {
            city = await City.findOneAndDelete({ _id: id })// el metodo .findOneAndDelete encuentra y elimina
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error: error
        })
    },

    multiplesCities: async (req, res) => {
        let city = []
        const data = req.body.data //almaceno en la constante data la informacion que le pedi al body.
        let error = null
        try {
            data.map(async (city) => {
                await new City({
                    name: city.name,
                    country: city.country,
                    image: city.image,
                    description: city.description
                }).save()
            })
        } catch (err) { error = err }
        city = await City.find()
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error: error
        })
    },
}

module.exports = citiesControllers