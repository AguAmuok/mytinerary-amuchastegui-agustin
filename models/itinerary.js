const mongoose = require('mongoose')

//creamos el modelo con las distintas propiedades que necesitaremos

const itinerarySchema = new mongoose.Schema({
    title: {type: String, required: true},
    userPic: {type: String, required: true},
    userName: {type: String, required: true},
    likes: {type: Number, default: 0},
    duration: {type: String, required: true},
    price: {type: String, required: true},
    hashtag: {type: Array , default: []},
    description: {type: String , required: true},
    cityId:{type: mongoose.Schema.ObjectId , ref : 'cities'},
    comments:[{
        comment: {type: String},
        userId: {type:mongoose.Types.ObjectId, ref: 'users'}
    }]
})

const Itinerary = mongoose.model('itinerary', itinerarySchema)
module.exports = Itinerary