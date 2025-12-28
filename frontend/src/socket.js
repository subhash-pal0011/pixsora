import { io } from "socket.io-client";

// 🔌 socket connect.
const socket = io("http://localhost:8000", {
       withCredentials: true,
       autoConnect: false, // ❗ important hii ye likhna pdta hii
});

export default socket;
