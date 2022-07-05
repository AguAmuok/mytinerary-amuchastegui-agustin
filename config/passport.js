const passport = require('passport') //autenticaciones de usuario
const jwtStrategy = require('passport-jwt').Strategy// constructor de estrategias
const extractJwt = require('passport-jwt').ExtractJwt//constructor de extracion de usuario

const Users = require('../models/user')
//defino una nueva estrategia, que mediante .fromauth... extraemos el token del header y compara la firma desencriptada con nuestra secret key

module.exports = passport.use(
    new jwtStrategy( 
        {jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),//extraemos bearer token
        secretOrKey:process.env.PASSWORD_TOKEN},//desencriptamos el token
        (jwt_payload, done) => {//info que trae el token de usuario

    Users.findOne({ _id: jwt_payload.id })// iguala el id payload con la del user
        .then(userData => {
            if (userData) {// si el user existe muestra usuario
                return done(null, userData)
            }
            else if (err) {
                return done(err, false);
            }
            else {
                return done(null, false)
            }
        })
        .catch(err => {
            console.log(err.status)
            return done(err, false)
        })

}))


