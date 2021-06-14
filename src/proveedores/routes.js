const controller =require("./controller")
const routes = (server) => {
    server.get("/provedores",controller.readAll)
    server.get("/provedores/:id",controller.readOne)
    server.post("/provedores",controller.insert)
    server.patch("/provedores/:id",controller.update)
}


module.exports = routes