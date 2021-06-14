const controller =require("./controller")
const routes = (server) => {
    server.get("/empleado",controller.readAll)
    server.get("/empleado/:id",controller.readOne)
    server.post("/empleado",controller.insert)
    server.patch("/empleado/:id",controller.update)
}


module.exports = routes