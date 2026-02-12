const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")

const registerSocketHandlers = require("./socket/handler")

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:5173',
            'https://uno-game.pages.dev'
        ],
        methods: ['GET', 'POST'] 
    }
});

registerSocketHandlers(io)

const PORT = process.env.PORT || 3500;

server.listen(PORT, () => {
    console.log(`Uno server running on port ${PORT}`)
});