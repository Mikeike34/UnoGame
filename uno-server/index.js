const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")

const registerSocketHandlers = require("./socket/handler")

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {origin: '*'}
})

registerSocketHandlers(io)

server.listen(3500, () => {
    console.log("Uno server running on port 3500")
})