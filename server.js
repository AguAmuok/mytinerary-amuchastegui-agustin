require('dotenv').config()
const express = require ('express') //requiero del modulo express
const Router = require ('./routes/routes') //requiero el modulo de las rutas de conexion
const app = express() //ejecutamos express para creear la app
const cors = require ('cors')  //requiero el modulo cors

const passport = require ('passport')

 //requiero dotenv que es una libreria que configura nuestra app con las variables de entonrno definidas en el archivo .env
require('./config/database')//requiero la conexion con la base de datos 

//middlewares
app.use(cors()) //la app/server usa el metodo cors para obtener permisos de acceso a la base de datos: SI NO LO PONEMOS NO FUNCIONA!
app.use(express.json())// la app/server usa el metodo de express que convierte todo a JSON   
app.use(passport.initialize())
app.use('/api', Router) //la app/server usa las rutas y como intermediario añade a casa endpoin =>/apiDeJobs

const PORT = 4000 // definimos el puerto con con la variable de estado "ó" un numero
//si defino PORT antes que requerir dotenv: va a tomar 4000, sino: EL DEFINIDO EN LA VARIABLE DE ESTADO CORRESPONDIENTE

app.set ('port', PORT) //.set setea o configura una propiedad de app, en este caso el puerto (aunque podemos usar directamente PORT)

app.get ('/', (req, res) => {//.get lee el endpoin
    res.send('SERVIDOR CREADO!') // y con .send enviamos informacion desde el back hacia el FRONT que vemos
})

app.listen(PORT, () => { //.listen escucha el puerto y lo levanta
    console.log('SERVER READY ON PORT: ' + app.get ('port')) // muestra por consola el texto "SERVER READY"
})