const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
    title: {type: String, required: true},
    userPic: {type: String, required: true},
    userName: {type: String, required: true},
    likes: {type: Number, default: 0},
    hours: {type: Number, required: true},
    price: {type: Number, required: true},
    hashtag: {type: Array , default: []},
    activities: {type: String , required: true},
})

const Itinerary = mongoose.model('itinerary', itinerarySchema)
module.exports = Itinerary