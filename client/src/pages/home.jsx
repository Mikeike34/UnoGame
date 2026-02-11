import { useState } from "react";
export default function Home({ onEnter }){

    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(username.trim()){
            onEnter(username.trim());
        }
    };

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
            <div className="w-full max-w-sm text-center space-y-6">
                {/* Game Title */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    UNO
                </h1>

                {/*Tagline */}
                <p className="text-white/70 text-sm sm:text-base">
                    A real-time multiplayer game of Uno
                </p>

                {/*Username Form */}
                <form onSubmit = {handleSubmit} className = "space-y-4">
                    <input 
                        type='text'
                        value = {username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        maxLength={15}
                        className = 'w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-uno-red border border-white/20'
                        autoFocus
                    />
                    <button
                        type='submit'
                        disabled = {!username.trim()}
                        className = 'w-full py-3 rounded-lg bg-uno-red hover:bg-uno-red/70 active:bg-uno-red/50 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        Enter
                    </button>
                </form>
                {/*Footer */}
                <p className='text-white/40 text-xs mt-8'>
                    Connect with friends and play Uno online! Developed by Michael Cantone
                </p>
            </div>
        </div>
    );
}