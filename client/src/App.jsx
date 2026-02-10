import { useState, useEffect } from 'react';
import { useSocket } from './context/SocketContext';
import Home from './pages/home';
import GameRoomsList from './pages/GameRoomsList';
import Lobby from './pages/lobby';
import GameBoard from './components/GameBoard';

function App() {
  const { socket } = useSocket();
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'rooms' | 'lobby' | 'game'
  const [username, setUsername] = useState('');
  const [playerId] = useState(() => crypto.randomUUID());
  const [gameState, setGameState] = useState(null);
  const [hostLeftMessage, setHostLeftMessage] = useState(null);

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    // Game created successfully
    socket.on('GAME_CREATED', (game) => {
      console.log('Game created:', game);
      setGameState(game);
      setCurrentView('lobby');
    });

    // Game state updated
    socket.on('GAME_STATE_UPDATE', (game) => {
      console.log('Game state updated:', game);
      setGameState(game);

      if(game.status === 'waiting' && currentView === 'rooms'){
        setCurrentView('lobby');
      }
      
      // Auto-navigate to game board when game starts
      if (game.status === 'active') {
        setCurrentView('game');
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
      setGameState(null);
      setCurrentView('rooms');
      setHostLeftMessage(true);
    });

    // Cleanup
    return () => {
      socket.off('GAME_CREATED');
      socket.off('GAME_STATE_UPDATE');
      socket.off('INVALID_MOVE');
    };
  }, [socket, currentView]);

  // Handler: User enters username
  const handleEnter = (enteredUsername) => {
    setUsername(enteredUsername);
    setCurrentView('rooms');
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

  // Handler: Leave lobby
  const handleLeaveLobby = () => {
    if(socket && gameState){
      socket.emit('LEAVE_GAME', {gameId: gameState.id, playerId});
    }
    setGameState(null);
    setCurrentView('roooms');
  };

  //Handler: Leave game
  const handleLeaveGame = () => {
    if(socket && gameState){
      socket.emit('LEAVE_GAME', {gameId: gameState.id, playerId});
    }
    setGameState(null);
    setCurrentView('rooms');
  };

  // Handler: Play card
  const handlePlayCard = (cardIndex) => {
    if (!socket || !gameState) return;

    const card = gameState.players.find(p => p.id === playerId)?.hand[cardIndex];
    
    // If wild or +4, prompt for color
    let chosenColor = null;
    if (card && (card.value === 'wild' || card.value === '+4')) {
      chosenColor = prompt('Choose color (red, blue, green, yellow):');
      if (!['red', 'blue', 'green', 'yellow'].includes(chosenColor)) {
        alert('Invalid color!');
        return;
      }
    }

    console.log('Playing card:', cardIndex, chosenColor);
    socket.emit('PLAY_CARD', {
      gameId: gameState.id,
      playerId,
      cardIndex,
      chosenColor
    });
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
          onLeave={handleLeaveLobby}
        />
      )}

      {currentView === 'game' && gameState && (
        <GameBoard
          players={gameState.players}
          currentPlayerId={playerId}
          currentTurnIndex={gameState.currentTurn}
          discardPile={gameState.discardPile}
          deckCount={gameState.deck.length}
          onDrawCard={handleDrawCard}
          onPlayCard={handlePlayCard}
          onLeaveGame={handleLeaveGame}
          winner={gameState.winner}
        />
      )}
    </>
  );
}

export default App;
 