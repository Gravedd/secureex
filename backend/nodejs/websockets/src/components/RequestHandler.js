import Controller from "../controllers/Controller.js";
import Server from "./Server.js";
import Log from "./Log";


export default class RequestHandler {

    routes = {
        "auth"           : "auth",
        "pong"           : "pong",
        "message"        : "newMessage",
        "allMessagesRead": "allMessagesRead",
        "typing"         : "typing",
    }

    constructor(socket, message, uuid) {
        this.socket = socket;
        this.message = JSON.parse(message);
        this.type = this.getType(this.message);
        this.controller = new Controller();
        this.uuid = uuid;

        this.requestHandler();
    }

    requestHandler() {
        let route = this.routes[this.message.action];
        if (!route) {
            return console.log("Роута не существует `route`", this.message.action);
        }

        let methodExists = route in this.controller;
        if (!methodExists) {
            return console.log("Метода `route` не существует");
        }
        try {
            this.controller[route](this.socket, this.message.data, this.uuid);
        } catch (Err) {
            Log.error(Err.message, Err);
        }

    }

    getType(message) {
        return message.action;
    }

    send(action, data) {
        return this.socket.send(JSON.stringify({
            "action": action,
            "data"  : data,
        }))
    }

    static requestAuth(socket) {
        return socket.send(JSON.stringify({
            "action": "auth",
            "data"  : "Авторизуйтесь!",
        }))
    }

    static sendPing(socket, uuid) {
        if (!Server.users[uuid]) {
            return;
        }

        Server.users[uuid]["ping_count"]++;

        let ping = Server.users[uuid]["ping_count"];
        let pong = Server.users[uuid]["pong_count"];

        if (pong > ping - 1) {
            console.log("Кик!");
            socket.close();
        }

        return socket.send(JSON.stringify({
            "action": "ping"
        }))
    }
}
