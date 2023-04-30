import WebSocket from "ws";
import RequestHandler from "./WsRequest";


export default class Server {

    start() {
        this.server = new WebSocket.Server({ port: 8080 });

        this.server.on('connection', (socket) => this.onConnection(socket));
    }

    onConnection(socket) {
        console.log('Client connected');
        RequestHandler.requestAuth(socket);

        socket.on('message', (message) => this.onMessage(socket, message));
        socket.on('close', () => this.onClose());
    }

    onMessage(socket, message) {
        new RequestHandler(socket, message);
    }

    onClose() {
        console.log('Client disconnected');
    }
}
