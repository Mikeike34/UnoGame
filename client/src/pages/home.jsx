function homePage({socket, setUsername}){
    const [name, setName] = React.useState("");

    const submit = () => {
        if(!name.trim()) return;
        setUsername(name);
        socket.emit('setUsername', name);
    };

    return(
        <div className="h-screen flex items-center justify-center bg-neutral-100">
            <div className="bg-white p-6 rounded-xl shadow-lg-w-80">
                <h1 className="text-xl font-bold mb-4">Enter Your Name: </h1>
                <input
                    className="w-full border px-3 py-2 rounded mb-4"
                    value={name}
                    onChange={e => setName(e.targetvalue)}
                />
                <button
                    onClick={submit}
                    className="w-full bg-green-600 text-white py-2 rounded"
                >
                    Join
                </button>
            </div>
        </div>
    );
}