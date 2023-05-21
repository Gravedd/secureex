import WebSocket, { WebSocketServer } from 'ws';
import RequestHandler from "./RequestHandler.js";
import Log from "./Log.js";


export default class Server {

    static users = {};

    start() {
        this.server = new WebSocketServer({ port: 8080 });

        this.server.on('connection', (socket) => this.onConnection(socket, Server.generateUUID()));
    }

    onConnection(socket, uuid) {
        console.log('Client connected');

        RequestHandler.requestAuth(socket);

        let intervalId = setInterval(() => {
            RequestHandler.sendPing(socket, uuid);
        }, 5000);

        socket.on('message', (message) => this.onMessage(socket, message, uuid));

        socket.on('close', () => this.onClose(uuid, intervalId));
    }

    onMessage(socket, message, uuid) {
        try {
            new RequestHandler(socket, message, uuid);
        } catch (error) {
            Log.error("RequestHandler " + error.name, ": " + error.message, error);
        }
    }

    onClose(uuid, intervalId) {
        delete Server.users[uuid];
        clearInterval(intervalId);
    }

    static onUserSuccessAuthorized(user, socket, uuid) {
        Server.users[uuid] = {
            "ws" : socket,
            "data" : user,
            "ping_count" : 0,
            "pong_count" : 0,
        };
        console.log("Юзер авторизовался: uuid=" + uuid);
    }

    static generateUUID() {
        let uuid = '';

        for (let i = 0; i < 3; i++) {
            uuid += Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');
            uuid += '';
        }

        uuid += Math.floor(Math.random() * 0xffffffffffff).toString(16).padStart(12, '0');

        return uuid;
    }
}
