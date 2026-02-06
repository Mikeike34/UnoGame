export default function Home({ onCreateGame, onJoinGame }){
    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
            <div className="w-full max-w-sm text-center space-y-6">
                {/* Game Title */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    Home
                </h1>

                {/*Tagline */}
                <p className="text-white/70 text-sm sm:text-base">
                    A real-time multiplayer game of Uno
                </p>

                {/*Username Input*/}
                <input 
                    type="text"
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/*Actions*/}
                <div className="space-y-3">
                    <button
                        onClick={onJoinGame}
                        className = "w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
                    >
                        Create Game
                    </button>
                    <button
                        onClick={onJoinGame}
                        className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition"
                    >
                        Join Game
                    </button>
                </div>
            </div>
        </div>
    )
}