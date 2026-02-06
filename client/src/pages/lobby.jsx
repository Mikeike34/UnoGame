export default function Lobby({
    roomCode,
    players,
    isHost,
    onStartGame,
    onLeave
}){
    return(
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-800 rounded-xl p-6 space-y-5 shadow-lg">
                
                {/*Header */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">Game Lobby</h2>
                    <p className="text-white/70 text-sm mt-1">
                        Room Code
                    </p>
                    <p className="text-indigo-400 font-mono text-lg mt-1">
                        {roomCode}
                    </p>
                </div>

                {/*Players */}
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {players.map((player, i) => (
                        <div
                            key ={i}
                            className="flex items-center justify-between bg-white/5 px-4 py-2 rounded-lg"
                        >
                            <span className="text-white font-medium">
                                {player.name}
                            </span>
                            {player.isHost && (
                                <span className="text-xs text-indigo-400">
                                    Host
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/*Status */}
                <p className="text-center text-white/60 text-sm">
                    Waiting for players...
                </p>

                {/*Actions */}
                <div className="space-y-2">
                    {isHost && (
                        <button
                            onClick ={onStartGame}
                            className = 'w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition'
                        >
                            Start Game
                        </button>
                    )}

                    <button
                        onClick={onLeave}
                        className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                    >
                        Leave Lobby
                    </button>
                </div>
            </div>
        </div>
    )
}