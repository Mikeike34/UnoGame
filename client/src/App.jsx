import GameBoard from "./components/GameBoard";

function App() {

  // Sample game state for demo
  const samplePlayers = [
    {
      id: 'player1',
      name: 'You',
      hand: [
        { color: 'red', value: '5' },
        { color: 'blue', value: 'skip' },
        { color: 'green', value: '7' },
        { color: 'yellow', value: 'draw2' },
        { color: 'wild', value: '+4' },
        { color: 'red', value: '3' },
        { color: 'blue', value: '9' },
      ]
    },
    {
      id: 'player2',
      name: 'Alice',
      hand: new Array(5).fill({ color: 'red', value: '0' }) // 5 cards
    },
    {
      id: 'player3',
      name: 'Bob',
      hand: new Array(7).fill({ color: 'blue', value: '0' }) // 7 cards
    },
    {
      id: 'player4',
      name: 'Charlie',
      hand: new Array(3).fill({ color: 'green', value: '0' }) // 3 cards
    }
  ];

  const sampleDiscardPile = [
    { color: 'green', value: '2' }
  ];

  const handleDrawCard = () => {
    console.log('Draw card clicked');
  };

  const handlePlayCard = (cardIndex) => {
    console.log('Playing card at index:', cardIndex);
  };

  return (
    <GameBoard
      players={samplePlayers}
      currentPlayerId="player1"
      discardPile={sampleDiscardPile}
      deckCount={42}
      onDrawCard={handleDrawCard}
      onPlayCard={handlePlayCard}
    />
  );
}


export default App
 