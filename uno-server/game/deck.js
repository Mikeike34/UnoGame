const colors = ['red', 'blue', 'green', 'yellow']
const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'skip', 'reverse', 'draw2'] 

function createDeck(){
    const deck = []

    for (const color of colors){
        for(const value of values){
            deck.push({color, value: value})
            if ( value !== "0") deck.push({color, value: value})
        }
    }

    //wilds
    for(let i= 0; i < 4; i++){
        deck.push({color: 'wild',  value: 'wild'})
        deck.push({color: 'wild',  value: '+4'})
    }

    return shuffle(deck)
}

function shuffle(deck){ //fisher-yates shuffle
    for(let i = deck.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]
    }

    return deck
}

module.exports = { createDeck }