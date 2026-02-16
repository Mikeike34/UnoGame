const { createDeck } = require("./deck")

function startGame(game){
    game.deck = createDeck()

    //deal 7 cards
    game.players.forEach(player => {
        player.hand = game.deck.splice(0,7)
    })

    //start discard pile
    let firstCard = game.deck.pop();
    while(firstCard.color === 'wild'){
        game.deck.unshift(firstCard);
        firstCard = game.deck.pop();
    }
    game.discardPile = [firstCard];

    //First player starts
    game.currentTurn = 0
    game.direction = 1
    game.status = 'active'
}



module.exports = { startGame }