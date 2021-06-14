const express = require('express')

const app = express()
const router = require("./routes")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
///////////////////aqui van las rutas
router(app)
///////////////////
app.listen(3002,() => {
    console.log(`Escuchando en http://localhost:3002`)
})

//capura promesas no capturadas
process.on('unhandledRejection',error =>{
    // console.error('UnhandledRejection',error)
    console.error('unhandledRejection',error)
})
//captura excepciones no capturadas
process.on('uncaughtException',error =>{
    // console.error('UncaughtException',error)
    console.error('UncaughtException',error)
})