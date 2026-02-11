import React from 'react';
import Card from './Card';

/* 
Desktop Layout:
┌─────────────────────────────┐
│         TOP ZONE            │
│         (Opponent)          │
├─────┬─────────────────┬─────┤
│LEFT │      CENTER     │RIGHT│
│ZONE │       ZONE      │ZONE │
├─────┴─────────────────┴─────┤
│        BOTTOM ZONE          │
│           (You)             │
└─────────────────────────────┘

Mobile Layout: Single Column
Top Player
Left Player
Right Player
Center (Draw/Discard)
Bottom player(You)
*/

function GameBoard({ 
  players = [], 
  currentPlayerId, 
  currentTurnIndex = 0,
  discardPile = [], 
  deckCount = 0,
  onDrawCard,
  onPlayCard,
  onLeaveGame,
  winner=null,
  cardAnimation =null 
}) {
  
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  const opponents = players.filter(p => p.id !== currentPlayerId);

  const topPlayer = opponents[0];
  const leftPlayer = opponents[1];
  const rightPlayer = opponents[2];
  
  // Get top card from discard pile
  const topCard = discardPile[discardPile.length - 1]
  const currentTurnPlayerId = players[currentTurnIndex]?.id

  const isMyTurn = currentTurnPlayerId === currentPlayerId

  const animatingPlayerId = cardAnimation?.playerId;
  const animationType = cardAnimation?.type;

  const discardFlash = animatingPlayerId && animationType === 'play';
  const deckFlash = animatingPlayerId && animationType === 'draw';

  const isHandAnimating = (pid) => animatingPlayerId === pid;

  

  return (
    <div className="
      relative
      w-full
      h-screen
      overflow-hidden
      bg-linear-to-br from-green-800 to-green-900
    ">
      <button
        onClick={onLeaveGame}
        className='absolute top-4 left-4 z-50 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition shadow-lg text-sm'
      >
        Leave Game
      </button>

      {/*Win Message Overlay */}
      {winner && (
        <div className='absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl p-8 shadow-2xl text-center max-w-md mx-4 animate-bounce-in'>
            <div className ='text-6xl mb-4'>🎉</div>
            <h2 className='text-4xl dont-bold text-uno-red mb-2'>Game Over!</h2>
            <p className = 'text-2xl font-semibold text-gray-800 mb-6'>{winner} Wins!</p>
            <button
              onClick={onLeaveGame}
              className='px-6 py-3 bg-uno-red hover:bg-uno-red/90 text-white rounded-lg font-semibold transition'
            >
              Back to Lobby
            </button>
          </div>
        </div>
      )}

      {/*Mobile Layout -Single Column*/}
      <div className = "md:hidden flex flex-col h-full py-4 gap-4">
        {/*Top Player */}
        {topPlayer && (
          <div className='flex justify-center'>
            <Opponent 
              player = {topPlayer}
              side = 'top'
              isCurrentTurn = {currentTurnPlayerId === topPlayer.id}
              isHandAnimating={isHandAnimating(topPlayer.id)}
              animationType={animationType}
            />
          </div>
        )}

        {/* Left Player */}
        {leftPlayer && (
          <div className="flex justify-center">
            <Opponent 
              player={leftPlayer}
              side='left'
              isCurrentTurn={currentTurnPlayerId === leftPlayer.id}
              isHandAnimating={isHandAnimating(leftPlayer.id)}
              animationType={animationType}
            />
          </div>
        )}

        {/* Right Player */}
        {rightPlayer && (
          <div className="flex justify-center">
            <Opponent 
              player={rightPlayer}
              side='right'
              mobileLayout = 'left'
              isCurrentTurn={currentTurnPlayerId === rightPlayer.id}
              isHandAnimating={isHandAnimating(rightPlayer.id)}
              animationType={animationType}
            />
          </div>
        )}
        {/* Center Piles — mobile */}
        <div className='flex items-center justify-center gap-6 flex-1'>
          <div
            onClick={onDrawCard}
            className={`cursor-pointer hover:scale-105 transition-transform ${deckFlash ? 'animate-card-flash' : ''}`}
          >
            <Card showBack isPlayable />
            <p className='text-white text-xs text-center mt-1'>{deckCount} cards</p>
          </div>
          <div className={discardFlash ? 'animate-card-flash' : ''}>
            {topCard ? (
              <Card color={topCard.color} value={topCard.value} isPlayable={false} />
            ) : (
              <div className='w-16 h-24 border-2 border-white/40 rounded-xl flex items-center justify-center text-white/50 text-xs'>
                Discard
              </div>
            )}
          </div>
        </div>

        {/* Bottom Player (You) */}
        {currentPlayer && (
          <div className='px-2.5 pb-2'>
            <div className={`
              transition-all
              ${isMyTurn ?
                "ring-4 ring-white/30 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.25)] p-2"
                : ""
              }
              ${isHandAnimating(currentPlayer.id) ? 'animate-hand-pulse' : ''}
            `}>
              <p className='text-center text-white font-bold text-sm mb-2'>
                {currentPlayer.name} (You)
                {isMyTurn && " - Your Turn"}
              </p>

              <div className='flex justify-center -space-x-12 px-2 overflow-x-auto'>
                {currentPlayer.hand.map((card, i) => (
                  <Card 
                    key={i}
                    color={card.color}
                    value={card.value}
                    onClick={() => onPlayCard(i)}
                    isPlayable={isMyTurn}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/*Desktop Layout - Grid */}
      <div className='hidden md:flex md:flex-col md:h-full md:gap-4 md:p-4'>
        {/* Top Zone - Spans all 3 columns */}
        {topPlayer && (
          <div className="flex justify-center items-center">
            <Opponent 
              player={topPlayer} 
              side='top' 
              isCurrentTurn={currentTurnPlayerId === topPlayer.id}
              isHandAnimating={isHandAnimating(topPlayer.id)}
              animationType={animationType}
            />
          </div>
        )}

        {/* Middle Row - 3 columns */}
        <div className="flex-1 flex items-center justify-center gap-8">

        
          {/* Left Zone */}
          <div className="flex items-center justify-center min-w-[200px]">
            {leftPlayer && (
                <Opponent 
                  player={leftPlayer}
                  side='left'
                  vertical
                  isCurrentTurn={currentTurnPlayerId === leftPlayer.id}
                  isHandAnimating={isHandAnimating(leftPlayer.id)}
              animationType={animationType}
                />
            )}
          </div>

          {/* Center Piles — desktop */}
          <div className='flex items-center justify-center gap-8'>
            <div
              onClick={onDrawCard}
              className={`cursor-pointer hover:scale-105 transition-transform ${deckFlash ? 'animate-card-flash' : ''}`}
            >
              <Card showBack isPlayable />
              <p className='text-white text-xs text-center mt-1'>{deckCount} cards</p>
            </div>
            <div className={discardFlash ? 'animate-card-flash' : ''}>
              {topCard ? (
                <Card color={topCard.color} value={topCard.value} isPlayable={false} />
              ) : (
                <div className='w-24 h-36 border-2 border-white/40 rounded-xl flex items-center justify-center text-white/50 text-sm'>
                  Discard
                </div>
              )}
            </div>
          </div>

          {/* Right Zone */}
          <div className="flex items-center justify-center min-w-[200px]">
            {rightPlayer && (
                <Opponent 
                  player={rightPlayer} 
                  side='right'
                  vertical
                  isCurrentTurn={currentTurnPlayerId === rightPlayer.id} 
                  isHandAnimating={isHandAnimating(rightPlayer.id)}
              animationType={animationType}
                />
            )}
          </div>
        </div>

        {/* Bottom Zone - Spans all 3 columns */}
        {currentPlayer && (
          <div className='flex justify-center items-end px-2.5 pb-2.5'>
            <div className={`
              transition-all
              ${isMyTurn ?
                "ring-4 ring-white/30 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.25)] p-2"
                : ""
              }
              ${isHandAnimating(currentPlayer.id) ? 'animate-hand-pulse': ''}
            `}>
              <p className='text-center text-white font-bold mb-2'>
                {currentPlayer.name} (You)
                {isMyTurn && " - Your Turn"}
              </p>

              <div className='flex justify-center -space-x-8 lg:-space-x-6 xl:gap-2'>
                {currentPlayer.hand.map((card, i) => (
                  <Card 
                    key={i}
                    color={card.color}
                    value={card.value}
                    onClick={() => onPlayCard(i)}
                    isPlayable={isMyTurn}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

function Opponent({ player, vertical = false, side, isCurrentTurn, mobileLayout, isAnimating}){
  const maxCards = 6;
  const displayCards = player.hand.slice(0, maxCards);
  const hiddenCards = Math.max(0, player.hand.length - maxCards);

  const isRightSideLayout = side === 'right' && !mobileLayout;

  return(
    <div
      className={`
          flex items-center gap-3
          ${isRightSideLayout ? 'md:flex-row-reverse' : ""}
          ${isAnimating ? 'animate-hand-pulse' : ''}
        `}
    >
      {/*Info panel */}
      <div className= {`bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-center shrink-0
      ${isCurrentTurn ? "ring-3 ring-white rounded-xl p-2" : ""}`}>
        <p className='text-white text-sm font-bold'>{player.name}</p>
        <p className='text-white text-xs'>{player.hand.length} cards</p>
      </div>

      {/*Hand */}
      <div
        className={`
            flex -space-x-8 sm:-space-x-10
            items-center
            overflow-hidden max-w-[260px] md:max-w-none
            ${vertical && side === "left" ? "rotate-90": ""}
            ${vertical && side === "right" ? "-rotate-90": ""}
            ${ side === "top" ? "-rotate-180": ""}
          `}
      >
        {displayCards.map((_,i) => (
          <Card 
            key={i}
            showBack
            isPlayable={false}
          />
        ))}
        {hiddenCards > 0 && (
          <div className ='text-white text-xs ml-2 font-bold bg-white/20 px-2 py-1 rounded'>
            +{hiddenCards}
          </div>
        )}
      </div>
    </div>
  );
}

export default GameBoard;