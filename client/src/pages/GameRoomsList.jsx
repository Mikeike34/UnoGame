import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";

export default function GameRoomsList({username, onCreateGame, onJoinGame, hostLeftMessage, onDismissHostLeft}){
    const { socket } = useSocket();
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        if(!socket) return;

        socket.emit('GET_GAMES');

        socket.on('GAMES_LIST', (gamesList) => {
            console.log('Recieving games list: ', gamesList);
            setRooms(gamesList);
        });

        //Poll for updates every 2 seconds
        const interval = setInterval(() => {
            socket.emit('GET_GAMES');
        }, 2000);

        return () => {
            socket.off('GAMES_LIST');
            clearInterval(interval);
        };
    }, [socket]);

    const handleCreateGame = () => {
        onCreateGame();
    };

    const handleJoinRoom = () => {
        if(selectedRoom){
            onJoinGame(selectedRoom.id);
        }
    };

    const canJoinRoom = (room) => {
        return room.status === 'waiting' && room.playerCount < 4;
    };

    return(
        <div className = 'min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4 py-8 overflow-hidden'
            style={{
            height: '100dvh',
            paddingTop: 'env(safe-area-inset-top)', 
            paddingBottom: 'env(safe-area-inset-bottom)',
            }}
        >
            <div className="w-full max-w-2xl space-y-6">
                {/*Header */}
                <div className= "text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">Game Rooms</h1>
                    <p className="text-white/60">Welcome, {username}!</p>
                </div>

                {/*Host Left Banner */}
                {hostLeftMessage && (
                    <div className = 'flex items-center justify-between bg-yellow-500/20 border border-yellow-500/40 text-yellow-200 px-4 py-3 rounded-lg'>
                        <span className ='text-sm font-medium'>The host ended the game.</span>
                        <button
                            onClick={onDismissHostLeft}
                            className ='ml-4 text-yellow-200 hover:text-white font-bold text-lg leading-none'
                        >
                            x
                        </button>
                    </div>
                )}
                {/*Create Game Button */}
                <button
                    onClick = {handleCreateGame}
                    className = "w-full py-4 rounded-lg bg-uno-red hover:bg-uno-red/90 active:bg-uno-red/60 text-white font-semibold transition text-lg"
                >
                    Create New Game
                </button>

                {/*Rooms List */}
                <div className="bg-slate-800 rounded-xl p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Available Rooms: ({rooms.filter(canJoinRoom).length})
                    </h2>

                    {rooms.length === 0 ? (
                        <div className="text-center py-8 text-white/50">
                            <p>No Active Games</p>
                            <p className="text-sm mt-2">Create one to get started!</p>
                        </div>
                    ):(
                        <div className = "space-y-3 max-h-96 overflow-y-auto">
                            {rooms.map((room) => {
                                const joinable = canJoinRoom(room);
                                const isSelected = selectedRoom?.id === room.id;

                                return(
                                    <div
                                        key = {room.id}
                                        onClick ={() => joinable && setSelectedRoom(room)}
                                        className={`
                                            p-4 rounded-lg border-2 transition cursor-pointer
                                            ${isSelected
                                                ? 'border-uno-red bg-uno-red/10'
                                                : joinable
                                                    ? 'border-white/20 bg-white/5 hover:border-white/40'
                                                    : 'border-white/10 bg-white/5 opacity-50 cursor-not-allowed'
                                            }
                                            `}
                                    >
                                        <div className = "flex items-center justify-between">
                                            <div>
                                                <div className='flex items-center gap-3'>
                                                    <span className = "text-white font-mono font-bold text-lg">
                                                        {room.id}
                                                    </span>
                                                    <span
                                                        className = {`
                                                                px-2 py-1 rounded text-xs font-semibold
                                                                ${room.status === 'waiting'
                                                                    ? 'bg-green-500/20 text-green-400'
                                                                    : 'bg-red-500/20 text-red-400'
                                                                }
                                                            `}
                                                    >
                                                        {room.status === 'waiting' ? 'Waiting' : 'In Game'}
                                                    </span>
                                                </div>
                                                <div className ="text-white/60 text-sm mt-1">
                                                    {room.players.map(p => p.name).join(', ')}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white font-semibold">
                                                    {room.playerCount}/4
                                                </div>
                                                <div className = 'text-white/50 text-xs'>
                                                    players
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                {/*Join Button */}
                {selectedRoom && (
                    <button
                        onClick={handleJoinRoom}
                        disabled={!canJoinRoom(selectedRoom)}
                        className="w-full py-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-400 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Join {selectedRoom.id}
                    </button>
                )}
            </div>
        </div>
    );
}