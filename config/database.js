const mongoose = require ('mongoose') //requiero mongoose
//mongose es una libreria que me proporciona un monton de funciones para conectar mi servidor/app a la base de datos de MONGO

mongoose.connect(process.env.MONGO_URI,{ //Utilizo el método connect de mongoose que requiere dos parámetros (URL de coneccion y un objeto con dos propiedades)

    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log('Database connected')) //si se logra conectar, me avisa por consola
.catch(err => console.error(err)) //si no se conecta, me informa el error

//una vez que configure la conexion, la tengo que requerir antes de que se inicie la app
//despues configuro los modelos