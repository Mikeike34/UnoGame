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
  onPlayCard 
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

  return (
    <div className="
      relative
      w-full
      h-screen
      overflow-hidden
      bg-linear-to-br from-green-800 to-green-900
    ">
      {/*Mobile Layout -Single Column*/}
      <div className = "md:hidden flex flex-col h-full py-4 gap-4">
        {/*Top Player */}
        {topPlayer && (
          <div className='flex justify-center'>
            <Opponent 
              player = {topPlayer}
              side = 'top'
              isCurrentTurn = {currentTurnPlayerId === topPlayer.id}
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
            />
          </div>
        )}

        {/* Center Zone - Draw & Discard Piles */}
        <div className='flex items-center justify-center gap-6 flex-1'>
          {/* Draw Pile */}
          <div 
            onClick={onDrawCard} 
            className='cursor-pointer hover:scale-105 transition-transform'
          >
            <Card showBack isPlayable />
            <p className='text-white text-xs text-center mt-1'>{deckCount} cards</p>
          </div>

          {/* Discard Pile */}
          <div>
            {topCard ? (
              <Card color={topCard.color} value={topCard.value} />
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
      <div className='hidden md:grid md:grid-cols-[auto_1fr_auto] md:grid-rows-[auto_1fr_auto] md:h-full md:gap-4 md:p-4'>
        {/* Top Zone - Spans all 3 columns */}
        {topPlayer && (
          <div className="md:col-span-3 flex justify-center items-center">
            <Opponent 
              player={topPlayer} 
              side='top' 
              isCurrentTurn={currentTurnPlayerId === topPlayer.id}
            />
          </div>
        )}

        {/* Middle Row - 3 columns */}
        {/* Left Zone */}
        {leftPlayer && (
          <div className='flex items-center justify-center'>
            <Opponent 
              player={leftPlayer}
              side='left'
              vertical
              isCurrentTurn={currentTurnPlayerId === leftPlayer.id}
            />
          </div>
        )}

        {/* Center Zone - Draw & Discard */}
        <div className='flex items-center justify-center gap-8'>
          {/* Draw Pile */}
          <div 
            onClick={onDrawCard} 
            className='cursor-pointer hover:scale-105 transition-transform'
          >
            <Card showBack isPlayable />
            <p className='text-white text-xs text-center mt-1'>{deckCount} cards</p>
          </div>

          {/* Discard Pile */}
          <div>
            {topCard ? (
              <Card color={topCard.color} value={topCard.value} />
            ) : (
              <div className='w-24 h-36 border-2 border-white/40 rounded-xl flex items-center justify-center text-white/50 text-sm'>
                Discard
              </div>
            )}
          </div>
        </div>

        {/* Right Zone */}
        {rightPlayer && (
          <div className='flex items-center justify-center'>
            <Opponent 
              player={rightPlayer} 
              side='right'
              vertical
              isCurrentTurn={currentTurnPlayerId === rightPlayer.id} 
            />
          </div>
        )}

        {/* Bottom Zone - Spans all 3 columns */}
        {currentPlayer && (
          <div className='md:col-span-3 flex justify-center items-end pb-2.5'>
            <div className={`
              transition-all
              ${isMyTurn ?
                "ring-4 ring-white/30 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.25)] p-2"
                : ""
              }
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

function Opponent({ player, vertical = false, side, isCurrentTurn, mobileLayout}){
  const maxCards = 6;
  const displayCards = player.hand.slice(0, maxCards);
  const hiddenCards = Math.max(0, player.hand.length - maxCards);

  const isRightSideLayout = side === 'right' && !mobileLayout;

  return(
    <div
      className={`
          flex items-center gap-3
          ${isRightSideLayout ? 'md:flex-row-reverse' : ""}
          ${isCurrentTurn ? "ring-2 ring-white/40 rounded-xl p-2" : ""}
        `}
    >
      {/*Info panel */}
      <div className='bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-center shrink-0'>
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