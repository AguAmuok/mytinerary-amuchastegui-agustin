const Router = require('express').Router(); // requiero el metodo Router de la libreria de express

const {getCities, getOneCity, addCity, modifyCity, removeCity, multiplesCities} = require('../controllers/citiescontrollers'); 
const {getItinerary, addItinerary, removeItinerary, modifyItinerary, getOneItinerary, multiplesItineraries, getItinerariesByCity,likeDislike } = require('../controllers/itinerarycontrollers');
const {signIn,signUp,verifyMail,signOut,verifyToken} = require('../controllers/userscontroller')
const{getActivities,addActivity,removeActivity,modifyActivity,getOneActivity,multiplesActivities,getActivitiesByitinerary} = require('../controllers/activitiescontrollers');
const {addComment, modifyComment,deleteComment}= require('../controllers/commentControler')
const validator = require('../config/validator')
const passport = require('../config/passport')


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

//ROUTER ITINERARIES

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

Router.route("/like/:id")
.put(passport.authenticate("jwt", {session: false}),likeDislike)

//ROUTER COMMENT
Router.route('/itineraries/comment')
.post(passport.authenticate('jwt',{ session: false }),addComment)


Router.route('/itineraries/comment/:id')
.post(passport.authenticate('jwt',{ session: false }),deleteComment)
.put(passport.authenticate('jwt',{ session: false }),modifyComment)

//ROUTER ACTIVITIES
Router.route('/activities')
.get(getActivities)
.post(addActivity)

Router.route('/activities/:id')
.delete(removeActivity)
.put(modifyActivity)
.get(getOneActivity)

Router.route('/multiplesActivities')
.post(multiplesActivities)

Router.route('/activitiesbyitinerary/:id')
.get(getActivitiesByitinerary)

//ROUTER USERS

Router.route('/auth/signUp')
.post(validator,signUp)

Router.route('/auth/signIn')
.post(signIn)

Router.route('/auth/signOut')
.post(signOut)

Router.route('/verify/:string')
.get(verifyMail)

Router.route('/auth/signInToken')
.get(passport.authenticate('jwt',{ session: false}),verifyToken)


module.exports = Router //exportamos el modulo

//vamos a requerir las rutas en server para poder conectarnos con ellas a la base de datos
