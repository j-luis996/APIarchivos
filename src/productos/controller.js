const response = require('../network/response')
const fs = require('fs')

function readAll(req,res){
    let data_json = []
    let data = fs.readFileSync(`${__dirname}/tabla.txt`,{encoding:"ascii"})
    
    data_json = convertir_cadena(data)

    response.success(req,res,data_json,200)
}
function readOne(req,res){
    let data_json = []
    let data = fs.readFileSync(`${__dirname}/tabla.txt`,{encoding:"ascii"})
    
    data_json = convertir_cadena(data)
    
    for(let i in data_json){
        
        if(data_json[i].id==req.params.id){
            console.log(data_json[i])
            response.success(req,res,data_json[i],200)
        }
    }
    
}

function convertir_cadena(data){
    data_json=[]
    let data_separada = []
    data = data.split("\n")
    let data_clean=[]
    for(let i in data){
        data_separada.push(data[i].split("  "))
    }
    for(let i in data_separada){
        data_clean.push(data_separada[i].filter(Boolean))
    }
    

    data_clean.reduce((acumulador,actual,indice, array )=>{
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
    return data_json
}

module.exports = {
    readAll,
    readOne,
}