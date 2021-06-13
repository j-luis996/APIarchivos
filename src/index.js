const express = require('express')
const fs = require('fs')

const app = express()
const response = require('./network/response')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//aquí se mandan a llamar las rutas existentes
app.get('/', (req,res)=>{
    let data = fs.readFileSync(`${__dirname}/prueba.txt`,{encoding:"ascii"})
    fs.writeFileSync(`${__dirname}/prueba.txt`,`${data}
dato1    dato2    dato3`)
    
    let data_separada = data.split("\n")
    let data_separada2 = []
    let data_json = []

    for(let i in data_separada){
        data_separada2.push(data_separada[i].split("    "))
    }

    data_separada2.reduce((acumulador,actual,indice, array )=>{
        let cadena = ""
        for(let i in acumulador){
            if(i==0){
                cadena+="{"
            }
            cadena += `"${acumulador[i]}":"${actual[i]}"`;
            if(i!=(acumulador.length-1)){
                cadena+=","
            }
            if(i==(acumulador.length-1)){
                cadena+="}"
            }
        }
        
        data_json.push(JSON.parse(cadena))
        return acumulador
    })
    response.success(req, res, data_json, 200)
    
})

app.listen(8080,() => {
      console.log(`Escuchando en http://localhost:8080`)
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