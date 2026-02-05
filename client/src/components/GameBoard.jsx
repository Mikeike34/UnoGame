import React from 'react';
import Card from './Card';

function GameBoard({ 
  players = [], 
  currentPlayerId, 
  discardPile = [], 
  deckCount = 0,
  onDrawCard,
  onPlayCard 
}) {
  
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  const otherPlayers = players.filter(p => p.id !== currentPlayerId);
  
  // Get top card from discard pile
  const topCard = discardPile[discardPile.length - 1];

  return (
    <div className="relative w-full h-screen bg-linear-to-br from-green-800 to-green-900 overflow-hidden">
      
      {/* Game Title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <h1 className="text-4xl font-bold text-uno-red">UNO</h1>
      </div>

      {/* Other Players - positioned around the table */}
      {/* Top opponent */}
      {otherPlayers[0] && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg mb-2">
              <p className="text-white font-bold">{otherPlayers[0].name}</p>
              <p className="text-white/80 text-sm">{otherPlayers[0].hand.length} cards</p>
            </div>
            <div className="flex -space-x-12">
              {otherPlayers[0].hand.map((_, cardIndex) => (
                <Card
                  key={cardIndex}
                  color="red"
                  value="0"
                  showBack={true}
                  isPlayable={false}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Left opponent */}
      {otherPlayers[1] && (
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg mb-2">
              <p className="text-white font-bold">{otherPlayers[1].name}</p>
              <p className="text-white/80 text-sm">{otherPlayers[1].hand.length} cards</p>
            </div>
            <div className="flex -space-x-12">
              {otherPlayers[1].hand.map((_, cardIndex) => (
                <Card
                  key={cardIndex}
                  color="red"
                  value="0"
                  showBack={true}
                  isPlayable={false}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Right opponent */}
      {otherPlayers[2] && (
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg mb-2">
              <p className="text-white font-bold">{otherPlayers[2].name}</p>
              <p className="text-white/80 text-sm">{otherPlayers[2].hand.length} cards</p>
            </div>
            <div className="flex -space-x-12">
              {otherPlayers[2].hand.map((_, cardIndex) => (
                <Card
                  key={cardIndex}
                  color="red"
                  value="0"
                  showBack={true}
                  isPlayable={false}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Center Area - Draw Pile & Discard Pile */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-8 items-center">
        
        {/* Draw Pile */}
        <div 
          onClick={onDrawCard}
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          <Card 
            color="red"
            value="0"
            showBack={true}
            isPlayable={true}
          />
          <p className="text-white text-xs text-center mt-1">{deckCount} cards</p>
        </div>

        {/* Discard Pile */}
        <div className="relative">
          {topCard ? (
            <Card 
              color={topCard.color}
              value={topCard.value}
              isPlayable={false}
            />
          ) : (
            <div className="w-24 h-36 border-4 border-dashed border-white/50 rounded-xl flex items-center justify-center">
              <p className="text-white/50 text-sm text-center">Discard<br/>Pile</p>
            </div>
          )}
        </div>
      </div>

      {/* Current Player's Hand - Bottom */}
      {currentPlayer && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          {/* Player info */}
          <div className="text-center mb-4">
            <p className="text-white font-bold text-lg">{currentPlayer.name} (You)</p>
          </div>
          
          {/* Hand of cards */}
          <div className="flex gap-2 justify-center">
            {currentPlayer.hand.map((card, index) => (
              <Card
                key={index}
                color={card.color}
                value={card.value}
                onClick={() => onPlayCard(index)}
                isPlayable={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Turn indicator */}
      <div className="absolute top-20 right-8 bg-white/20 backdrop-blur-sm px-6 py-4 rounded-lg">
        <p className="text-white text-sm mb-2">Current Turn:</p>
        <p className="text-white font-bold text-lg">
          {players.find((p, i) => i === 0)?.name || 'Waiting...'}
        </p>
      </div>
    </div>
  );
}

export default GameBoard;