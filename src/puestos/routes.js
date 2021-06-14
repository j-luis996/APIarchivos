const controller =require("./controller")
const routes = (server) => {
    server.get("/puestos",controller.readAll)
    server.get("/puestos/:id",controller.readOne)
    server.post("/puestos",controller.insert)
    server.patch("/puestos/:id",controller.update)
}


module.exports = routes