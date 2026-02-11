//Socket Handler:
//Socket events and updates


const { createGame, getGame, deleteGame, joinGame, games, playCard, drawCard, canStartGame, advanceTurn } = require("../game/gameManager")
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

        })

        socket.on("START_GAME", ({ gameId, playerId }) => {
            const game = getGame(gameId)

            if(!game){
                socket.emit('INVALID_MOVE', "Game not found")
                return
            }
            //validate host
            const validation = canStartGame(game, playerId)

            if(!validation.canStart){
                socket.emit('INVALID_MOVE', validation.error)
                return
            }

            //start game
            console.log(`Game ${game.id} starting with ${game.players.length} players`)
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

            console.log(`Player ${name} joined game ${game.id} (${game.players.length}/${4} players)`)

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

                    if(game.status === 'active'){
                        const currentPlayer = game.players[game.currentTurn]
                        if(currentPlayer.id === player.id){
                            console.log(`Player ${player.name} disconnected during their turn. advancing turn...`)
                            advanceTurn(game)
                        }
                    }
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
                io.to(gameId).emit("CARD_PLAYED", { playerId })
                io.to(gameId).emit("GAME_STATE_UPDATE", game)
            }
        })

        socket.on("DRAW_CARD", ({ gameId, playerId}) => {
            const game = getGame(gameId)
            const result = drawCard(game, playerId)

            if(result.error){
                socket.emit("INVALID_MOVE", result.error)
            }else{
                io.to(gameId).emit('CARD_DRAWN', { playerId })
                io.to(gameId).emit("GAME_STATE_UPDATE", game)
            }
        })

        socket.on("LEAVE_GAME", ({ gameId, playerId}) => {
            const game = getGame(gameId)
            if(!game) return

            const isHost = game.hostId === playerId

            if(isHost){
                //Notify other players that host is leaving
                console.log(`Host left game ${gameId}, ending Ggame...`)
                io.to(gameId).emit('HOST_LEFT')
                deleteGame(gameId)
            }else{
                //Non-host player leaving- just remove them from player list
                game.players = game.players.filter(p => p.id !== playerId)
                console.log(`Player ${playerId} left game ${gameId}`)

                //if no players left clean up game
                if(game.players.length === 0){
                    deleteGame(gameId)
                }else{
                    io.to(gameId).emit("GAME_STATE_UPDATE", game)
                }
            }
        })


        socket.on("GET_GAMES", () => {
            const publicGames = Array.from(games.values())
            .filter(game => game.status === 'waiting' || game.status === 'active')
            .map(game => ({
                id: game.id,
                hostId: game.hostId,
                players: game.players.map(p => ({
                    id: p.id,
                    name: p.name,
                    connected: p.connected
                })),
                status: game.status,
                playerCount: game.players.length
            }))

            socket.emit("GAMES_LIST", publicGames)
        })
    })
}