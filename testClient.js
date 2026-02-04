//Testing


// testClient.js
// Interactive CLI test client for UNO server

const { io } = require("socket.io-client")
const { randomUUID } = require("crypto")
const readline = require("readline")

const socket = io("http://localhost:3500")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const playerId = randomUUID()
let currentGame = null

const ROLE = process.argv[2]        // host | join
const GAME_ID = process.argv[3]
const PLAYER_NAME = process.argv[4] || (ROLE === 'host' ? 'Host' : 'Player')

if (!["host", "join"].includes(ROLE)) {
  console.log(`
Usage:
  Host:
    node testClient.js host HostName

  Join:
    node testClient.js join GAME_ID PlayerName
`)
  process.exit(1)
}

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id)

  if (ROLE === "host") {
    socket.emit("CREATE_GAME", {
      name: process.argv[3] || PLAYER_NAME,
      playerId
    })
  }

  if (ROLE === "join") {
    socket.emit("JOIN_GAME", {
      gameId: GAME_ID,
      name: PLAYER_NAME,
      playerId
    })
  }
})

socket.on("GAME_CREATED", game => {
  console.log(`🎮 Game created: ${game.id}`)
  console.log("➡️ Waiting for players...")
})

socket.on("GAME_STATE_UPDATE", game => {
  currentGame = game
  renderGame(game)
  prompt()
})

socket.on("INVALID_MOVE", msg => {
  console.log("❌ Invalid move:", msg)
  prompt()
})

/* ============================
   CLI COMMANDS
============================ */

function prompt() {
  rl.question("> ", input => handleCommand(input.trim()))
}

function handleCommand(input) {
  if (!currentGame) return prompt()

  const [cmd, ...args] = input.split(" ")

  switch (cmd) {
    case "hand":
      showHand()
      break

    case "top":
      showTopCard()
      break

    case "play":
      playCard(args)
      break

    case "reconnect":
      reconnect()
      break

    case "draw":
      draw()
      break

    case "help":
      showHelp()
      break

    default:
      console.log("Unknown command. Type `help`.")
  }

  prompt()
}

/* ============================
   COMMAND IMPLEMENTATIONS
============================ */

function showHand() {
  const me = currentGame.players.find(p => p.id === playerId)
  if (!me) return console.log("❌ You are not in the game")

  console.log("🃏 Your hand:")
  me.hand.forEach((card, i) => {
    console.log(`  [${i}] ${card.color} ${card.value}`)
  })
}

function showTopCard() {
  const top = currentGame.discardPile.at(-1)
  if (!top) return console.log("Discard pile empty")

  console.log(`🟢 Top card: ${top.color} ${top.value}`)
}

function playCard(args) {
  if (!args.length) {
    console.log("Usage: play <cardIndex> [color]")
    return
  }

  const cardIndex = Number(args[0])
  const chosenColor = args[1] || null

  socket.emit("PLAY_CARD", {
    gameId: currentGame.id,
    playerId,
    cardIndex,
    chosenColor
  })
}

function draw(){
  socket.emit("DRAW_CARD", {
    gameId: currentGame.id,
    playerId
  })
}

function reconnect() {
  console.log("🔄 Reconnecting...")
  socket.disconnect()
  socket.connect()

  socket.once("connect", () => {
    socket.emit("REJOIN_GAME", {
      gameId: currentGame.id,
      playerId
    })
  })
}

function showHelp() {
  console.log(`
Commands:
  hand                Show your cards
  top                 Show top discard card
  play <i> [color]    Play card index (color required for wild/+4)
  draw                Draw a card
  reconnect           Simulate disconnect/reconnect
  help                Show this help
`)
}

/* ============================
   GAME RENDER
============================ */

function renderGame(game) {
  console.clear()

  console.log("====== GAME STATE ======")
  console.log("Game ID:", game.id)
  console.log("Status:", game.status)

  const top = game.discardPile.at(-1)
  if (top) {
    console.log(`Top Card: ${top.color} ${top.value}`)
  }

  console.log("\nPlayers:")
  game.players.forEach((p, i) => {
    const turn = i === game.currentTurn ? "⬅️ TURN" : ""
    const you = p.id === playerId ? "(you)" : ""
    console.log(`- ${p.name} ${you} | cards: ${p.hand.length} ${turn}`)
  })

  console.log("========================\n")

  if(game.status === 'finished'){
    console.log('GAME OVER')
    console.log(`${game.winner} WON THE GAME!`)
    return
  }
}


