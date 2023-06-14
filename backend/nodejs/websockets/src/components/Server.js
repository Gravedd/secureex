import WebSocket, {WebSocketServer} from 'ws';
import RequestHandler from "./RequestHandler.js";
import Log from "./Log.js";
import url from "url"
import querystring from "querystring";


export default class Server {

    static users = {};

    static ws_key;
    static api;

    start() {
        this.server = new WebSocketServer({port: 8080});
        Server.ws_key = global.env_vars.WS_KEY;
        Server.api = global.env_vars.APP_URL + "/api";

        this.server.on('connection', (socket, req) => this.onConnection(socket, Server.generateUUID(), req));
    }

    onConnection(socket, uuid, req) {
        this.connectionAuthorization(socket, uuid, req).then(authorized => {

            let intervalId = setInterval(() => {
                RequestHandler.sendPing(socket, uuid, intervalId);
            }, 5000);

            socket.on('message', (message) => this.onMessage(socket, message, uuid));

            socket.on('close', () => this.onClose(uuid, intervalId));

        }).catch(authorized => {
            return socket.close(1008);
        });
    }

    onMessage(socket, message, uuid) {
        try {
            new RequestHandler(socket, message, uuid);
        } catch (error) {
            Log.error("RequestHandler " + error.name, ": " + error.message, error);
        }
    }

    onClose(uuid, intervalId) {
        if (Server.users[uuid]) {
            delete Server.users[uuid];
        }
        clearInterval(intervalId);
    }

    static onUserSuccessAuthorized(user, socket, uuid) {
        Server.users[uuid] = {
            "ws"        : socket,
            "data"      : user,
            "ping_count": 0,
            "pong_count": 0,
        };

        socket.send(JSON.stringify({
            "action": "auth_success",
            "data"  : {}
        }))
    }

    static getUser(uuid) {
        return Server.users[uuid] ?? null;
    }

    static sendMessageToUserId(user_id, message = {}) {
        for (let uuid in Server.users) {
            if (!Server.users[uuid].data || Server.users[uuid].data.id != user_id) {
                continue;
            }
            Server.getUser(uuid).ws.send(JSON.stringify(message));
        }
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


    connectionAuthorization(socket, uuid, req) {
        return new Promise(async (resolve, reject) => {
            let authorized = false;

            if (req.headers?.server_key && req.headers?.origin === "localhost") {
                authorized = await this.serverAuthorization(socket, uuid, req);
            } else {
                authorized = await this.userAuthorization(socket, uuid, req);
            }

            return authorized ? resolve(authorized) : reject(authorized);
        })
    }

    async serverAuthorization(socket, uuid, req) {
        const connection_key = req.headers.server_key;

        if (connection_key === Server.ws_key) {
            return true;
        }

        Log.error("Не удачная авторизация сервера", {"connection_key": connection_key, "server_key": Server.ws_key});

        return false;
    }

    async userAuthorization(socket, uuid, req) {
        let token = url.parse(req.url)
        token = querystring.parse(token.query);
        token = token?.token;

        if (!token) {
            return false;
        }

        let response = await fetch(Server.api + "/user", {
            headers: {
                "Authorization": 'Bearer ' + token,
                "Accept"       : "application/json",
            }
        });

        if (response.status !== 200) {
            console.log("Ошибка авторизации", await response.json())
            return false;
        }

        let user = await response.json();
        Server.onUserSuccessAuthorized(user, socket, uuid);

        return true;
    }
}
