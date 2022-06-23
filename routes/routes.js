const Router = require('express').Router(); // requiero el metodo Router de la libreria de express


const {getCities, getOneCity, addCity, modifyCity, removeCity, multiplesCities} = require('../controllers/citiescontrollers'); 
const {getItinerary, addItinerary, removeItinerary, modifyItinerary, getOneItinerary, multiplesItineraries, getItinerariesByCity } = require('../controllers/itinerarycontrollers');
 //desustructuro los consoladores


Router.route('/cities') // a Router le configuro una ruta (/cities)
.get(getCities)// aplicamos a la ruta el metodo GET para asignarle el controlador de lectura/obtencion de los modelos 
.post(addCity) //con el metodo POST le asignamos el controlador de creacion de modelos

Router.route('/cities/:id') 
.delete(removeCity) //metodo DELETE eliminamos
.put(modifyCity)// metodo PUT modificamos
.get(getOneCity) // metodo GET leemos una sola ciudad

Router.route('/multiplesCities')
.post(multiplesCities) // metodo POST agregamos varias ciudades



//RUTAS ITINERARIES

Router.route('/itineraries')
.get(getItinerary)
.post(addItinerary)

Router.route('/itineraries/:id')
.delete(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)

Router.route('/multiplesItineraries')
.post(multiplesItineraries)

Router.route('/itinerarybycity/:id')
.get(getItinerariesByCity)

module.exports = Router //exportamos el modulo

//vamos a requerir las rutas en server para poder conectarnos con ellas a la base de datos
