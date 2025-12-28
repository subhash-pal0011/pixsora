import { io } from "socket.io-client";

// 🔌 socket connect.
const socket = io("https://pixsora-backend-85ol.onrender.com", {
       withCredentials: true,
       autoConnect: false, // ❗ important hii ye likhna pdta hii
});

export default socket;
