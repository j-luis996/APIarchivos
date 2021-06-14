const controller =require("./controller")
const routes = (server) => {
    server.get("/usuarios",controller.readAll)
    server.get("/usuarios/:id",controller.readOne)
    server.post("/usuarios",controller.insert)
    server.patch("/usuarios/:id",controller.update)
}


module.exports = routes