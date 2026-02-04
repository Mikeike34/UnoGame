//Game manager:
//Game state & Rules


const{ createDeck } = require('./deck')
const games = new Map()

function generateId(){
    return Math.random().toString(36).substring(2,7).toUpperCase()
}

function createGame(socketId, name, playerId){
    const gameId = generateId()
    const deck = createDeck()

    const game = {
        id: gameId,
        players: [
            {
                id: playerId,
                socketId,
                name,
                hand: [],
                hasCalledUno: false,
                connected: true
            }
        ],
        deck,
        discardPile: [],
        currentTurn: 0,
        direction: 1,
        status: 'waiting',
        winner: null
    }

    games.set(gameId, game)
    return game
}

function getGame(gameId){
    return games.get(gameId)
}

function joinGame(gameId, socketId, name, playerId){
    const game = games.get(gameId)
    if(!game) return { error: "Game not found"}

    //rejoin logic
    const existing = game.players.find(p => p.id === playerId)
    if(existing){
        existing.socketId = socketId
        existing.connected = true
        return game
    }

    if(game.status !== "waiting") return {error: 'Game already started'}


    game.players.push({
        id: playerId,
        socketId,
        name,
        hand:[],
        connected: true
    })
    return game
}

function nextPlayerIndex(game, steps = 1){
    return (
        game.currentTurn + 
        steps * game.direction + 
        game.players.length) % game.players.length
}

function drawCards(player, n, game){
    for(let i = 0; i < n; i++){
        const card = game.deck.pop()
        if(card) player.hand.push(card)
    }
}

function drawCard(game, playerId){
    const player = game.players.find(p => p.id === playerId)
    if(!player) return {error: "Player not found"}

    //turn validation
    if(game.players[game.currentTurn].id !== playerId){
        return { error: "Not your turn"}
    }

    drawCards(player, 1, game)

    //drawing ends your turn
    game.currentTurn = nextPlayerIndex(game)

    return { game }
}

function canPlay(card, topCard){
    return(
        card.color === topCard.color ||
        card.value === topCard.value ||
        card.color === 'wild'
    )
}


function playCard(game, playerId, cardIndex, chosenColor = null){
    const player = game.players.find(p => p.id === playerId)
    if(!player) return {error: "Player not found"}

    //turn check
    if(game.players[game.currentTurn].id !== playerId){
        return {error: "Not your turn"}
    }

    const card = player.hand[cardIndex]
    if(!card) return {error: "Invalid card"}

    const topCard = game.discardPile[game.discardPile.length - 1]

    if(topCard && !canPlay(card, topCard)){
        return {error: "Cannot play this card"}
    }

    //Remove from hand and add to the discard pile
    player.hand.splice(cardIndex, 1)
    game.discardPile.push(card)

    //win check
    if(player.hand.length === 0){
        game.status = 'finished'
        game.winner = player.name
        return { game, winner: player.name }
    }

    //apply special effects
    switch(card.value){
        case 'skip':
            game.currentTurn = nextPlayerIndex(game, 2) //skips next player
            break
        case 'reverse':
            game.direction *= -1
            game.currentTurn = nextPlayerIndex(game)
            break
        case 'draw2': {
            const next = game.players[nextPlayerIndex(game)]
            drawCards(next, 2, game)
            game.currentTurn = nextPlayerIndex(game)
            break
        }
        case 'wild':
            if(!chosenColor) return {error: 'Must choose a color'}
            card.color = chosenColor
            game.currentTurn = nextPlayerIndex(game)
            break
        case '+4':
            if(!chosenColor) return {error: "Must chose a color"}
            card.color = chosenColor
            const next = game.players[nextPlayerIndex(game)]
            drawCards(next, 4, game)
            game.currentTurn = nextPlayerIndex(game)
            break
        default: //number cards
            game.currentTurn = nextPlayerIndex(game)
            break
    }

    return { game }
}

module.exports = {createGame, getGame, joinGame, games, playCard, drawCards, canPlay, nextPlayerIndex, drawCard}