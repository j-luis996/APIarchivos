const controller =require("./controller")
const routes = (server) => {
    server.get("/categorias",controller.readAll)
    server.get("/categorias/:id",controller.readOne)
    server.post("/categorias",controller.insert)
    server.patch("/categorias/:id",controller.update)
}


module.exports = routes