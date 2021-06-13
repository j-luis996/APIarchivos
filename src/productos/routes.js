const controller =require("./controller")
const routes = (server) => {
    server.get("/",controller.readAll)
    server.get("/:id",controller.readOne)
    server.post("/",controller.insert)
    server.patch("/:id",controller.update)
}


module.exports = routes