import socketIOClient from "socket.io-client";

const socket = socketIOClient(process.env.SERVER_URL);

export default socket;