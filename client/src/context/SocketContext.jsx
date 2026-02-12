import React, { createContext, useContext, useEffect, useState} from "react";
import {io} from 'socket.io-client';

const SocketContext = createContext(null);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function useSocket(){
    return useContext(SocketContext);
}

export function SocketProvider({children}){
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        //Connect to server
        const newSocket = io(BACKEND_URL, {
            transports: ['websocket'],
        });

        newSocket.on('connect', () => {
            console.log('Connected to server: ', newSocket.id);
            setConnected(true);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
            setConnected(false);
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    return(
        <SocketContext.Provider value={{socket, connected}}>
            {children}
        </SocketContext.Provider>
    );
}