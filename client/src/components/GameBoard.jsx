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

      {/* Other Players - positioned around the table */}
      {/* Top opponent */}
      {otherPlayers[0] && (
        <div className="absolute top-8 sm:top-12 md:top-16 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg mb-1 sm:mb-2">
              <p className="text-white font-bold text-xs sm:text-sm md:text-base">{otherPlayers[0].name}</p>
              <p className="text-white/80 text-[10px] sm:text-xs md:text-sm">{otherPlayers[0].hand.length} cards</p>
            </div>
            <div className="flex -space-x-8 sm:-space-x-10 md:-space-x-12 max-w-[calc(100vw-8rem)]">
              {otherPlayers[0].hand.map((_, cardIndex) => (
                <Card
                  key={cardIndex}
                  color="red"
                  value="0"
                  showBack={true}
                  isPlayable={false}
                />
              ))}
              {otherPlayers[0].hand.length > 10 && (
                <div className='flex items-center justify-center text-white text-xs sm:text-sm ml-2'>
                  +{otherPlayers[0].hand.length - 10}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Left opponent */}
      {otherPlayers[1] && (
        <div className="absolute top-1/2 left-0 w-1/2 transform -translate-y-1/2">
          <div className="flex flex-row items-center gap-1 sm:gap-2">
            <div className="bg-white/20 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg">
              <p className="text-white font-bold text-xs sm:text-sm md:text-base">{otherPlayers[1].name}</p>
              <p className="text-white/80 text[10px] sm:text-xs md:text-sm">{otherPlayers[1].hand.length} cards</p>
            </div>
            <div className="flex -space-x-8 sm:-space-x-10 md:-space-x-12 -rotate-90 -ml-2 max-w-[calc(100vw-16rem)]">
              {otherPlayers[1].hand.map((_, cardIndex) => (
                <Card
                  key={cardIndex}
                  color="red"
                  value="0"
                  showBack={true}
                  isPlayable={false}
                />
              ))}
              {otherPlayers[1].hand.length > 8 && (
                <div className='flex items-center justify-center text-white text-xs sm:text-sm ml-2'>
                  +{otherPlayers[1].hand.length - 8}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Right opponent */}
      {otherPlayers[2] && (
        <div className="absolute top-1/2 right-2 sm:right-4 md:right-8 transform -translate-y-1/2">
          <div className="flex flex-row-reverse items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 rounded-lg">
              <p className="text-white font-bold text-xs sm:text-sm md:text-base">{otherPlayers[2].name}</p>
              <p className="text-white/80 text-[10px] sm:text-xs md:text-sm">{otherPlayers[2].hand.length} cards</p>
            </div>
            <div className="flex -space-x-8 md:-space-x-4 rotate-90 max-w-[calc(100vw-16rem)]">
              {otherPlayers[2].hand.map((_, cardIndex) => (
                <Card
                  key={cardIndex}
                  color="red"
                  value="0"
                  showBack={true}
                  isPlayable={false}
                />
              ))}
              {otherPlayers[2].hand.length > 8 && (
                <div className='flex items-center justify-center text-white text-xs sm:text-sm ml-2'>
                  +{otherPlayers[2].hand.length - 8}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Center Area - Draw Pile & Discard Pile */}
      <div className="absolute top-55 sm:top-85 md:top-1/2 left-1/2 transform -translate-x-1/2 sm:-translate-y-1/2 flex gap-4 sm:gap-6 md:gap-8 items-center">
        
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
          <p className="text-white text-center mt-1 text-[10px] sm:text-xs">
            {deckCount} cards
          </p>
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
            <div className="rounded-xl flex items-center justify-center w-16 h-24 sm:w-20 sm:h-32 md:w-24 md:h-36 border-2 sm:border-4 border-white/50">
              <p className="text-white/50 text-center text-[10px] sm:text-xs md:text-sm">Discard<br/>Pile</p>
            </div>
          )}
        </div>
      </div>

      {/* Current Player's Hand - Bottom */}
      {currentPlayer && (
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 w-full">
          {/* Player info */}
          <div className="text-center mb-2 sm:mb-3 md:mb-4">
            <p className="text-white font-bold text-sm sm:text-base md:text-lg">{currentPlayer.name} (You)</p>
          </div>
          
          {/* Hand of cards */}
          <div className="flex -space-x-8 md:-space-x-4 lg:gap-2 justify-center">
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
      <div className="absolute top-16 sm:top-20 right-2 sm:right-4 md:right-8 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
        <p className="text-white mb-1 sm:mb-2 text-[10px] sm:text-xs md:text-sm">Current Turn:</p>
        <p className="text-white font-bold text-xs sm:text-base md:text-lg">
          {players.find((p, i) => i === 0)?.name || 'Waiting...'}
        </p>
      </div>
    </div>
  );
}

export default GameBoard;