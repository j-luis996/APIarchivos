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
            response.success(req,res,data_json[i],200)
            return 1
        }
    }
    
    response.error(req,res,"algo salio mal",500)
}
function insert(req,res){
    const data = req.body
    let data_final = convertir_json(data)
    
    let archivo = fs.readFileSync(`${__dirname}/tabla.txt`,{encoding:"ascii"})
    fs.writeFileSync(`${__dirname}/tabla.txt`,`${archivo}
${data_final}`)
    response.success(req, res, "okay", 200)

}
function update(req,res){
    const id = req.params.id
    const data = req.body

    let archivo_separado = []
    let archivo_limpio = []

    data_limpia = convertir_json(data)

    let archivo = fs.readFileSync(`${__dirname}/tabla.txt`,{encoding:"ascii"})
    archivo = archivo.split("\n")
    for(let i in archivo){
        archivo_separado.push(archivo[i].split("  "))
    }
    
    for(let i in archivo_separado){
        archivo_limpio.push(archivo_separado[i].filter(Boolean))
    }

    let nueva_info = archivo_limpio.filter(datos=> datos[0].indexOf(id)===-1).join("\n")
    nueva_info+="\n"+data_limpia
    fs.writeFileSync(`${__dirname}/tabla.txt`,nueva_info)
    response.success(req, res, "okay", 200)
}
//convierte una cadena a un JSON
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
//convierte un JSON a string
function convertir_json(data){
    let data_final = []
    let data_string = JSON.stringify(data)
    data_string = data_string.replace("{","")
    data_string = data_string.replace("}","")
    data_string = data_string.replace(/['"]+/g, '')
    data_string = data_string.replace(/[',]+/g, ' ')
    data_string = data_string.split(' ')
    
    for(let i in data_string){
        data_final.push(data_string[i].split(':'))
    }
    data_string =[] 
    for(let i in data_final){
        for(j in data_final[i]){
            if(j%2!=0){
                data_string.push(data_final[i][j])
            }
        }
    }
    data_string = data_string.toString()
    data_string = data_string.replace(/[',]+/g, '   ')
    return data_string
}

module.exports = {
    readAll,
    readOne,
    insert,
    update,
}