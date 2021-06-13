const controller =require("./controller")
const routes = (server) => {
    server.get("/",controller.readAll)
    server.get("/:id",controller.readOne)
    server.post("/",controller.insert)
}


module.exports = routes