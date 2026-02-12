import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";

export default function Lobby({
    game,
    playerId,
    onStartGame,
    onLeave
}){
    const { socket } = useSocket();

    const isHost = game.hostId === playerId;
    const canStart = game.players.length >= 2;

    const handleStartGame = () => {
        if(isHost && canStart){
            onStartGame();
        }
    };

    return(
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 overflow-hidden"
            style={{
            height: '100dvh',
            paddingTop: 'env(safe-area-inset-top)', 
            paddingBottom: 'env(safe-area-inset-bottom)',
            }}
        >
            <div className="w-full max-w-md bg-slate-800 rounded-xl p-6 space-y-5 shadow-lg">
                
                {/*Header */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">Game Lobby</h2>
                    <p className="text-white/70 text-sm mt-1">
                        Room Code
                    </p>
                    <p className="text-uno-red font-mono text-2xl mt-1 font-bold">
                        {game.id}
                    </p>
                </div>

                {/*Player count */}
                <div className = "text-center">
                    <p className = 'text-white/60 text-sm'>
                        {game.players.length}/4 Players
                    </p>
                </div>

                {/*Players List */}
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {game.players.map((player) => {
                        const isYou = player.id === playerId;
                        const isPlayerHost = player.id === game.hostId;

                        return(
                            <div
                                key = {player.id}
                                className = {`
                                        flex items-center justify-between px-4 py-3 rounded-lg
                                        ${isYou ? 'bg-uno-red/20 border-2 border-uno-red' : 'bg-white/5'}
                                    `}
                            >
                                <span className = "text-white font-medium">
                                    {player.name} {isYou && '(You)'}
                                </span>
                                <div className="flex items-center gap-2">
                                    {!player.connected && (
                                        <span className = "text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded">
                                            Disconnected
                                        </span>
                                    )}
                                    {isPlayerHost && (
                                        <span className ="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded">
                                            Host
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {/*Status */}
                <div className="text-center py-4 bg-white/5 rounded-lg">
                    {isHost ? (
                        <p className='text-white/80 text-sm'>
                            {canStart 
                                ? 'Ready to Start!'
                                : 'Waiting for more players to join...'
                            }
                        </p>
                    ):(
                        <p className="text-white/60 text-sm">
                            Waiting for host to start the game...
                        </p>
                    )}
                </div>
                {/*Actions */}
                <div className = 'space-y-2'>
                    {isHost && (
                        <button
                            onClick={handleStartGame}
                            disabled={!canStart}
                            className ="w-full py-3 rounded-lg bg-uno-red hover:bg-uno-red/90 active:bg-uno-red/60 active:translate-y-0.5 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {canStart ? 'Start Game' : 'Need 2+ players'}
                        </button>
                    )}

                    <button
                        onClick={onLeave}
                        className ='w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/20 active:translate-y-0.5 text-white transition'
                    >
                        Leave Game
                    </button>
                </div>
            </div>
        </div>
    );
}