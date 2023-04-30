import Controller from "./Controller";


export default class RequestHandler {

    routes = {
        "auth" : "auth",
    }

    constructor(socket, message) {
        this.socket = socket;
        this.message = JSON.parse(message);
        this.type = this.getType(this.message);
        this.controller = new Controller();

        this.requestHandler();
    }

    requestHandler() {
        let route = this.routes[this.message.action];
        if (!route) {
            return console.log("Роута не существует");
        }

        let methodExists = route in this.controller;
        if (!methodExists) {
            return console.log("Метода не существует");
        }

        return this.controller[route](this.socket, this.message.data);
    }

    getType(message) {
        console.log(`Пользователь отправил сообщение. Тип: '${message.action}';`);
        return message.action;
    }

    send(action, data) {
        return this.socket.send(JSON.stringify({
            "action" : action,
            "data"   : data,
        }))
    }

    static requestAuth(socket) {
        return socket.send(JSON.stringify({
            "action" : "auth",
            "data"   : "Авторизуйтесь!",
        }))
    }
}
