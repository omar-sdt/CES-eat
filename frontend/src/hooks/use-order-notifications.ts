import {useEffect, useRef} from "react";
import {io, Socket} from "socket.io-client";
import {toast} from "sonner";

export const useOrderNotifications = (userId: string) => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!userId) return;

        const socket = io("http://localhost:4000");
        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("Connected to notification service");
            socket.emit("register", { userId });
        });

        socket.on("orderConfirmed", (data) => {
            console.log('data', data);
            toast.success(`${data.message}`);
        });

        socket.on("disconnect", () => {
            console.log("Socket déconnecté");
        });

        return () => {
            socket.disconnect();
        };
    }, [userId])
}