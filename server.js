const express = require ('express')
const Router = require ('./routes/routes')
const app = express()
const cors = require ('cors')

require('dotenv').config()
require('./config/database')

//middlewares
app.use(cors())
app.use(express.json())
app.use('/api', Router)

const PORT = 4000

app.set ('port', PORT)

app.get ('/', (req, res) => {
    res.send('SERVIDOR CREADO!')
})

app.listen(PORT, () => {
    console.log('SERVER READY ON PORT: ' + app.get ('port'))
})