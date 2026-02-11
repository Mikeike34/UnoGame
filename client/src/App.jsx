import { useState, useEffect, useRef } from 'react';
import { useSocket } from './context/SocketContext';
import Home from './pages/home';
import GameRoomsList from './pages/GameRoomsList';
import Lobby from './pages/lobby';
import GameBoard from './components/GameBoard';
import ColorPicker from './components/Colorpicker';

function App() {
  const { socket } = useSocket();
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'rooms' | 'lobby' | 'game'
  const [username, setUsername] = useState('');
  const [playerId] = useState(() => crypto.randomUUID());
  const [gameState, setGameState] = useState(null);
  const [hostLeftMessage, setHostLeftMessage] = useState(null);
  const [cardAnimation, setCardAnimation] = useState(null);
  const[showColorPicker, setShowColorPicker] = useState(false);
  const[pendingCardPlay, setPendingCardPlay] = useState(null);

  const currentViewRef = useRef(currentView);
  const setView = (view) => {
    currentViewRef.current = view;
    setCurrentView(view);
  };

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    // Game created successfully
    socket.on('GAME_CREATED', (game) => {
      console.log('Game created:', game);
      setGameState(game);
      setView('lobby');
    });

    // Game state updated
    socket.on('GAME_STATE_UPDATE', (game) => {
      console.log('Game state updated:', game);

      const isPlayerInGame = game.players.some(p => p.id === playerId);
      if(!isPlayerInGame){
        console.log('Player not in game, ignoring state update');
        return;
      }

      setGameState(game);

      if(game.status === 'waiting' && currentViewRef.current === 'rooms'){
        setView('lobby');
      }
      
      // Auto-navigate to game board when game starts
      if (game.status === 'active') {
        setView('game');
      }
    });

    // Invalid move
    socket.on('INVALID_MOVE', (error) => {
      console.error('Invalid move:', error);
      alert(`Error: ${error}`);
    });

    //Host Left Game
    socket.on('HOST_LEFT', () => {
      console.log('Host ended the game');
      
      const isPlayerInGame = game.players.some(p => p.id === playerId);
      if(!isPlayerInGame){
        console.log('Player not in game, ignoring state update');
        return;
      }

      setGameState(null);
      setView('rooms');
      setHostLeftMessage(true);
    });

    socket.on('CARD_PLAYED', ({ playerId: actingPlayerId }) => {
      setCardAnimation({type: 'play', playerId: actingPlayerId});
      setTimeout(() => setCardAnimation(null), 600);
    });

    socket.on('CARD_DRAWN', ({ playerId: actingPlayerId }) => {
      setCardAnimation({type: 'draw', playerId: actingPlayerId });
      setTimeout(() => setCardAnimation(null), 600);
    });

    // Cleanup
    return () => {
      socket.off('GAME_CREATED');
      socket.off('GAME_STATE_UPDATE');
      socket.off('INVALID_MOVE');
      socket.off('HOST_LEFT');
      socket.off('CARD_PLAYED');
      socket.off('CARD_DRAWN');
    };
  }, [socket, playerId]);

  // Handler: User enters username
  const handleEnter = (enteredUsername) => {
    setUsername(enteredUsername);
    setView('rooms');
  };

  // Handler: Create new game
  const handleCreateGame = () => {
    if (!socket || !username) return;

    console.log('Creating game...');
    socket.emit('CREATE_GAME', {
      name: username,
      playerId
    });
  };

  // Handler: Join existing game
  const handleJoinGame = (gameId) => {
    if (!socket || !username) return;

    console.log('Joining game:', gameId);
    socket.emit('JOIN_GAME', {
      gameId,
      name: username,
      playerId
    });
    // Will navigate to lobby via GAME_STATE_UPDATE
  };

  // Handler: Start game (host only)
  const handleStartGame = () => {
    if (!socket || !gameState) return;

    console.log('Starting game...');
    socket.emit('START_GAME', {
      gameId: gameState.id,
      playerId
    });
  };

  //Handler: Leave (from lobby or game)
  const handleLeave = () => {
    if(socket && gameState){
      socket.emit('LEAVE_GAME', {gameId: gameState.id, playerId});
    }
    setGameState(null);
    setView('rooms');
  };

  // Handler: Play card
  const handlePlayCard = (cardIndex) => {
    if (!socket || !gameState) return;

    const card = gameState.players.find(p => p.id === playerId)?.hand[cardIndex];
    
    // If wild or +4, prompt for color
    let chosenColor = null;
    if (card && (card.value === 'wild' || card.value === '+4')) {
      setPendingCardPlay({cardIndex});
      setShowColorPicker(true);
      return;
    }

    socket.emit('PLAY_CARD', {
      gameId: gameState.id,
      playerId,
      cardIndex,
      chosenColor: null
    });
  };

  //Handler: Color Select
  const handleColorSelect = (color) => {
    if(!socket || !gameState || !pendingCardPlay)return;

    socket.emit('PLAY_CARD', {
      gameId: gameState.id,
      playerId,
      cardIndex: pendingCardPlay.cardIndex,
      chosenColor: color
    });

    //Close picker and reset state
    setShowColorPicker(false);
    setPendingCardPlay(null);
  };

  //Handler: Cancel Color Select
  const handleColorPickerCancel = () => {
    setShowColorPicker(false);
    setPendingCardPlay(null);
  };

  // Handler: Draw card
  const handleDrawCard = () => {
    if (!socket || !gameState) return;

    console.log('Drawing card...');
    socket.emit('DRAW_CARD', {
      gameId: gameState.id,
      playerId
    });
  };

  // Render current view
  return (
    <>
      {currentView === 'home' && (
        <Home onEnter={handleEnter} />
      )}

      {currentView === 'rooms' && (
        <GameRoomsList
          username={username}
          onCreateGame={handleCreateGame}
          onJoinGame={handleJoinGame}
          hostLeftMessage={hostLeftMessage}
          onDismissHostLeft={() => setHostLeftMessage(false)}
        />
      )}

      {currentView === 'lobby' && gameState && (
        <Lobby
          game={gameState}
          playerId={playerId}
          onStartGame={handleStartGame}
          onLeave={handleLeave}
        />
      )}

      {currentView === 'game' && gameState && (
        <>
          <GameBoard
            players={gameState.players}
            currentPlayerId={playerId}
            currentTurnIndex={gameState.currentTurn}
            discardPile={gameState.discardPile}
            deckCount={gameState.deck.length}
            onDrawCard={handleDrawCard}
            onPlayCard={handlePlayCard}
            onLeaveGame={handleLeave}
            winner={gameState.winner}
            cardAnimation={cardAnimation}
          />

          {showColorPicker && (
            <ColorPicker 
              onColorSelect={handleColorSelect}
              onCancel={handleColorPickerCancel}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;
 