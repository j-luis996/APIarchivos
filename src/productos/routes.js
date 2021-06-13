const controller =require("./controller")
const routes = (server) => {
    server.get("/",controller.readAll)
    server.get("/:id",controller.readOne)
}


module.exports = routes