const Itinerary = require('../models/itinerary') //requerimos el modelo

const itineraryControllers = { //definimos un objeto con los controladores del modelo

    getItinerary: async (req, res) => { //funcion asincrona que creara un trabajo
        let itineraries //definimos las variables
        let error = null // definimos el error, que en primer instancia sera nulo
        try { //utilizamos el constructor de modelos
            itineraries = await Itinerary.find() // esperamos esa creacion y el metodo .FIND encuentra
        } catch (err) { error = err } // cachamos el error en caso de tener uno 
        res.json({
            response: error ? 'ERROR' : { itineraries }, //respuestas segun lo que suceda
            success: error ? false : true,
            error: error
        })
    },
    getOneItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try {
            itinerary = await Itinerary.findOne({ _id: id })
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : { itinerary },
            success: error ? false : true,
            error: error
        })
    }
    ,
    addItinerary: async (req, res) => {
        const { title, userPic, userName, likes, duration, price, hashtag, description, cityId } = req.body.data
        let itinerary
        let error = null
        try {
            itinerary = await new Itinerary({
                title: title,
                userPic: userPic,
                userName: userName,
                likes: likes,
                duration: duration,
                price: price,
                hashtag: hashtag,
                description: description,
                cityId: cityId
            }).save()
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },

    modifyItinerary: async (req, res) => {
        const id = req.params.id
        const itinerary = req.body
        let itinerarydb
        let error = null
        try {
            itinerarydb = await Itinerary.findOneAndUpdate( //el metodo .findeOneAndUpdate requiere tres parametros
                { _id: id }, //el parametro necesario para el modelo que tiene que encontrar
                itinerary,// la modificacion que vamos a pasar en body
                { new: true }) //y esta opcion en true que "cambia" el modelo viejo por el actualizado (en caso de false: crea un modelo nuevo con la modificacion)
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : itinerarydb,
            success: error ? false : true,
            error: error
        })
    },

    removeItinerary: async (req, res) => {
        const id = req.params.id
        let itinerary
        let error = null
        try {
            itinerary = await Itinerary.findOneAndDelete({ _id: id })// el metodo .findOneAndDelete encuentra y elimina
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },

    multiplesItineraries: async (req, res) => {
        let itinerary = []
        const data = req.body.data //almaceno en la constante data la informacion que le pedi al body.
        let error = null
        try {
            data.map(async (item) => {
                await new Itinerary({
                    title: item.title,
                    userPic: item.userPic,
                    userName: item.userName,
                    likes: item.likes,
                    duration: item.duration,
                    price: item.price,
                    hashtag: item.hashtag,
                    description: item.description,
                    cityId: item.cityId,
                }).save()
            })
        } catch (err) { error = err }
        itinerary = await Itinerary.find()
        res.json({
            response: error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error: error
        })
    },

    getItinerariesByCity: async (req, res) => {
        const id = req.params.id
        let itineraries
        let error = null
        try {
            itineraries = await Itinerary.find({ cityId: id }).populate('activitiesId')//populamos el campo activitiesId de tinerary
        console.log(itineraries)
        } catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : itineraries,
            success: error ? false : true,
            error: error
        })
    },

    likeDislike: async (req, res) => {
        const id = req.params.id //LLEGA POR PARAMETRO DESDE AXIOS
        const user = req.user.id //LLEGA POR RESPUESTA DE PASSPORT
        //console.log(id);
        //console.log(user);
        await Itinerary.findOne({ _id: id })

            .then((itinerary) => {
                //console.log(itinerary)
                if (itinerary.likes.includes(user)) {
                    Itinerary.findOneAndUpdate({ _id: id }, { $pull: { likes: user } }, { new: true })//con pull removemos
                        .then((response) => res.json({ success: true, response: response.likes }))
                        .catch((error) => console.log(error))
                } else {
                    Itinerary.findOneAndUpdate({ _id: id }, { $push: { likes: user } }, { new: true })//push subimos agregamos
                        .then((response) => res.json({ success: true, response: response.likes }))
                        .catch((error) => console.log(error))
                }
            })
            .catch((error) => res.json({ success: false, response: error }))
    },
}

module.exports = itineraryControllers