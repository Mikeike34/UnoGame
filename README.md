<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<img width="1913" height="1024" alt="GameBoard" src="https://github.com/user-attachments/assets/7d6dbe6a-3fb7-4379-a4f3-59d5007d8e49" />


<div align="center">
  <h1 align="center">UNO Online - Multiplayer Card Game</h1>

  <p align="center">
    A real-time multiplayer UNO game built with React, Node.js, and Socket.io
    <br />
    <a href="https://uno-game.pages.dev/"><strong>Try it Here!</strong></a>
    <br />
    <br />
    <a href="#usage">Explore The Features</a>
    ·
    <a href="https://github.com/Mikeike34/UnoGame/issues">Report Bug</a>
    ·
    <a href="https://github.com/Mikeike34/UnoGame/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#key-features">Key Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#technical-highlights">Technical Highlights</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

UNO Online is a fully-featured, real-time multiplayer card game that brings the classic UNO experience to the web. Built as a demonstration of modern full-stack development practices, this project showcases WebSocket communication, state management across multiple clients, and responsive design principles.

**Why I Built This:**
* To explore real-time multiplayer game architecture and WebSocket technology
* To practice state synchronization across multiple clients in a distributed system
* To create an engaging, production-ready application with professional UI/UX
* To demonstrate proficiency in the MERN stack and modern React patterns

The game supports 2-4 players simultaneously with smooth animations, intuitive mobile controls, and robust error handling for disconnections and edge cases.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![React][React.js]][React-url]
* [![Vite][Vite]][Vite-url]
* [![Node][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![Socket.io][Socket.io]][Socket.io-url]
* [![TailwindCSS][TailwindCSS]][TailwindCSS-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Key Features

**Game Mechanics:**
- ✅ Full UNO card game implementation (numbered cards, skip, reverse, draw2, wild, +4)
- ✅ Real-time multiplayer for 2-4 players
- ✅ Interactive color picker for wild cards
- ✅ Smooth card play/draw animations
- ✅ Turn indicators and game state synchronization

**User Experience:**
- ✅ Lobby system with room codes
- ✅ Host-controlled game start (requires 2+ players)
- ✅ Player disconnect handling with automatic turn skipping
- ✅ Win detection and game-over screen
- ✅ Mobile-responsive design with touch optimization

**Technical Features:**
- ✅ WebSocket-based real-time communication
- ✅ Centralized game state management
- ✅ Safe area support for notched devices (iPhone X+)
- ✅ Touch event optimization (prevents double-tap issues)
- ✅ Dynamic viewport height for mobile browsers
- ✅ Production-ready deployment configuration

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

* Node.js 18+ and npm
  ```sh
  node --version
  npm --version
  ```

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/YOUR_USERNAME/UnoGame.git
   cd UnoGame
   ```

2. Install backend dependencies
   ```sh
   cd uno-server
   npm install
   ```

3. Install frontend dependencies
   ```sh
   cd ../client
   npm install
   ```

4. Configure environment variables
   
   Create `client/.env.local`:
   ```env
   VITE_SOCKET_URL=ws://localhost:3500
   ```

5. Start the backend server
   ```sh
   cd uno-server
   npm start
   ```

6. Start the frontend development server (in a new terminal)
   ```sh
   cd client
   npm run dev
   ```

7. Open your browser to `http://localhost:5173`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

### Playing the Game

1. **Enter your username** on the home screen
2. **Create a new game** or **join an existing room** using a room code
3. **Wait in the lobby** for other players (host can start with 2+ players)
4. **Play cards** by clicking/tapping on your turn
5. **Choose a color** when playing wild cards via the interactive color picker
6. **Win** by being the first to play all your cards!

### Game Rules

- Match cards by color or number
- Special cards:
  - **Skip**: Next player loses their turn
  - **Reverse**: Reverses play direction
  - **Draw 2**: Next player draws 2 cards and loses their turn
  - **Wild**: Change the color
  - **+4**: Next player draws 4 cards, loses their turn, and you choose the color

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- EXAMPLES -->
## Screenshots

### Home Screen
<img width="1910" height="1026" alt="Home" src="https://github.com/user-attachments/assets/85def06a-b28b-4a52-ad09-e7e14fd0b188" />
*Clean, modern interface with username entry*

### Game Lobby
![Lobby Gif](https://github.com/user-attachments/assets/295748aa-571a-4675-a394-917314d978fd)
*Room code sharing and player waiting area*

### Active Gameplay - Desktop
![GamePlay](https://github.com/user-attachments/assets/b9100a51-4351-49e9-93ab-99d4b0362cb7)
*Full game board with 4 players, cards, and animations*

### Active Gameplay - Mobile
![mobileGamePlay](https://github.com/user-attachments/assets/d977eb65-c240-4dec-a0cb-fbfc718d1d9a)
</br> *Optimized mobile layout with touch controls*

### Color Picker Modal

*Interactive wild card color selection*
![ColorPicker](https://github.com/user-attachments/assets/98e27993-1a05-4691-86cd-75e9565380f9)
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TECHNICAL HIGHLIGHTS -->
## Technical Highlights

### Real-Time Multiplayer Architecture
- **WebSocket communication** via Socket.io for instant state updates
- **Server-authoritative game logic** prevents cheating
- **Broadcast synchronization** ensures all clients see identical game state
- **Disconnect handling** with automatic turn advancement

### State Management
- **Centralized game state** on the server (single source of truth)
- **Client-side caching** with React Context API for socket management
- **Optimistic UI updates** with server validation

### Mobile Optimization
- **Touch event handling** with synthetic click prevention
- **Dynamic viewport height** (dvh) for proper mobile browser UI handling
- **Safe area insets** for iPhone notch/home indicator support
- **Prevented double-tap issues** through event flag management
- **Natural touch feel** with overscroll prevention

### Code Quality
- **Modular architecture** (separate game logic, socket handlers, UI components)
- **Error boundaries** and graceful degradation
- **Production-ready deployment** configuration for Cloudflare Pages + Railway

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

**Completed:**
- [x] Core UNO game mechanics
- [x] Real-time multiplayer (2-4 players)
- [x] Lobby and room management
- [x] Mobile-responsive design
- [x] Touch optimization
- [x] Card animations
- [x] Color picker for wild cards
- [x] Disconnect handling
- [x] Production deployment

**Future Enhancements:**
- [ ] "UNO" button mechanic (call UNO when you have one card)
- [ ] In-game chat
- [ ] Game history and statistics
- [ ] AI opponent for single-player mode
- [ ] Custom game rules (house rules)
- [ ] Spectator mode
- [ ] Reconnection logic (rejoin after disconnect)
- [ ] Sound effects and music toggle

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DEPLOYMENT -->
## Deployment

This application is deployed using:
- **Frontend**: Cloudflare Pages (React/Vite build)
- **Backend**: Railway (Node.js/Express/Socket.io)

**Live Demo**: [https://uno-game.pages.dev/](https://uno-game.pages.dev/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Michael Cantone - michaeljcantone@gmail.com

[![LinkedIn][linkedin-shield]][linkedin-url]

Project Link: [https://github.com/Mikeike34/UnoGame](https://github.com/Mikeike34/UnoGame)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DISCLAIMER -->
## Disclaimer
This is a personal portfolio project created for educational purposes. 
UNO is a trademark of Mattel, Inc. This project is not affiliated with, 
endorsed by, or sponsored by Mattel, Inc.

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Socket.io Documentation](https://socket.io/docs/v4/)
* [React Documentation](https://react.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Best README Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-Connect-blue
[linkedin-url]: https://www.linkedin.com/in/michael-cantone/

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/

[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
[Node-url]: https://nodejs.org/en

[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=fff
[Express-url]: https://expressjs.com/

[Socket.io]: https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white
[Socket.io-url]: https://socket.io/

[TailwindCSS]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/

[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
