//Socket Handler:
//Socket events and updates


const { createGame, getGame, joinGame, games, playCard, drawCard } = require("../game/gameManager")
const { startGame } = require("../game/gameLogic")

module.exports = function registerSocketHandlers(io){
    io.on("connection", socket => {
        console.log("Connected: ", socket.id)

        socket.on("CREATE_GAME", ({name, playerId}) => {
            const game = createGame(socket.id, name, playerId)
            socket.join(game.id)

            console.log(`Game ${game.id} created by ${name}`)

            //broadcast to host
            socket.emit("GAME_CREATED", game)

            //Automatically start only if enough players join
            const MIN_PLAYERS = 2

            //poll every second until enough players join
            const startInterval = setInterval(() => {
                const currentGame = getGame(game.id)
                if(!currentGame){
                    clearInterval(startInterval)
                    return
                }

                if(currentGame.players.length >= MIN_PLAYERS && currentGame.status === 'waiting'){
                    console.log(`Starting game ${game.id} with ${currentGame.players.length} players`)
                    startGame(currentGame)
                    io.to(game.id).emit("GAME_STATE_UPDATE", currentGame)
                    clearInterval(startInterval)
                }
            },1000)
        })

        socket.on("START_GAME", ({ gameId }) => {
            const game = getGame(gameId)
            startGame(game)
            io.to(gameId).emit("GAME_STATE_UPDATE", game)
        })

        socket.on("JOIN_GAME", ({ gameId, name, playerId }) => {
            const game = joinGame(gameId, socket.id, name, playerId) //get game object

            if(!game || game.error){
                socket.emit('INVALID_MOVE', game?.error || "Unknown error")
                return
            }

            //Join the room after adding to players
            socket.join(game.id)

            console.log(`Player ${name} joined game ${game.id}`)

            //emit full game state to all players
            io.to(game.id).emit("GAME_STATE_UPDATE", game)
        })


        //rejoin game
        socket.on("REJOIN_GAME", ({gameId, playerId}) => {
            const game = getGame(gameId)
            if(!game) return

            const player = game.players.find(p => p.id === playerId)
            if(!player) return

            player.socketId = socket.id
            player.connected = true
            socket.join(game.id)

            io.to(game.id).emit("GAME_STATE_UPDATE", game)
        })


        //disconnect
        socket.on("disconnect", () => {
            for(const game of games.values()){
                const player = game.players.find(p => p.socketId === socket.id)
                if(player){
                    player.connected = false
                    io.to(game.id).emit("GAME_STATE_UPDATE", game)
                }
            }
        })

        socket.on("PLAY_CARD", ({gameId, playerId, cardIndex, chosenColor}) => {
            const game = getGame(gameId)
            const result = playCard(game, playerId, cardIndex, chosenColor)

            if(result.error){
                socket.emit("INVALID_MOVE", result.error)
            }else{
                io.to(gameId).emit("GAME_STATE_UPDATE", game)
            }
        })

        socket.on("DRAW_CARD", ({ gameId, playerId}) => {
            const game = getGame(gameId)
            const result = drawCard(game, playerId)

            if(result.error){
                socket.emit("INVALID_MOVE", result.error)
            }else{
                io.to(gameId).emit("GAME_STATE_UPDATE", game)
            }
        })
    })
}