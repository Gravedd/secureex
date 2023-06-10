import Server from "./Server.js";
import Log from "./Log.js";
import fs from "fs";

import ServerUserController from "../controllers/ServerUserController.js";
import Controller from "../controllers/Controller.js";


export default class RequestHandler {

    routes = {
        /* MAIN */
        "pong"           : "pong",
        "message"        : "newMessage",
        "allMessagesRead": "allMessagesRead",
        "typing"         : "typing",

        /* Server */
        "server.user.registered": "ServerUser.userRegistered",
    }

    constructor(socket, message, uuid) {
        this.socket = socket;
        this.message = JSON.parse(message);
        this.type = this.getType(this.message);

        this.controllers = {
            "Controller": new Controller(),
            "ServerUserController": new ServerUserController(),
        };
        this.uuid = uuid;

        this.requestHandler().then();
    }

    async requestHandler() {
        const route = this.getRouteData(this.message.action);

        if (Object.keys(route).length === 0) {
            return console.log("Роута не существует: ", this.message.action);
        }

        try {
            await this.handleController(route)
        } catch (Error) {
            console.log(Error.message);
        }

    }

    getRouteData(route) {
        let routeData = this.routes[route];
        if (!route) {
            console.log("Роута не существует `route`", route);
            return false;
        }

        routeData = routeData.split(".");

        switch (routeData.length) {
            case 1: return {"controller": "Controller", "action": routeData[0], "public": true};
            case 2: return {"controller": routeData[0] + "Controller", "action": routeData[1], "public": false}
            default: return {}
        }
    }

    async handleController(route) {
        let controller = this.controllers[route.controller] ?? false;
        if (!controller) {
            throw new Error(`Контролера ${route.controller} не существует`);
        }

        let methodExists = route.action in controller;
        if (!methodExists) {
            throw new Error(`Метода '${route.controller}.${route.action}' не существует`);
        }
        if (!route.public) {//Проверка на сервер
            if (this.message?.ws_key !== Server.ws_key) {
                throw new Error(`Роут '${route.controller}.${route.action}' не публичный!`);
            }
        }

        controller[route.action](this.socket, this.message.data, this.uuid);
    }

    getType(message) {
        return message.action;

        let type = message.action;
        type = type.split(".");

        switch (type.length) {
            case 1: return {"type": "main", "action": type[0]};
            case 2: return {"type": type[0], "action": type[1]}
            default: return {}
        }
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
