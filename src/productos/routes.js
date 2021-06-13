const controller =require("./controller")
const routes = (server) => {
    server.get("/productos",controller.readAll)
    server.get("/productos/:id",controller.readOne)
    server.post("/productos",controller.insert)
    server.patch("/productos/:id",controller.update)
}


module.exports = routes