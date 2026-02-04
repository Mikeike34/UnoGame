const { createDeck } = require("./deck")

function startGame(game){
    game.deck = createDeck()

    //deal 7 cards
    game.players.forEach(player => {
        player.hand = game.deck.splice(0,7)
    })

    //start discard pile
    game.discardPile = [game.deck.pop()]

    //First player starts
    game.currentTurn = 0
    game.direction = 1
    game.status = 'active'
}



module.exports = { startGame }