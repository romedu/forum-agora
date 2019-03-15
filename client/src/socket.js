import socketIOClient from "socket.io-client";

const socket = socketIOClient("https://localhost:3000");

export default socket;