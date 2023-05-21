import store from "@/store";

export default class {

    constructor(store, message, ws) {
        this.store = store;
        this.ws = ws;

        this.message = JSON.parse(message.data);
        this.type = this.getType(this.message);

        let methodExists = this.type in this;
        if (!methodExists) {
            return console.log(`Метода '${this.type}' не существует`);
        }

        return this[this.type]();
    }

    getType(message) {
        let action = message.action;
        return "on" + action[0].toUpperCase() + action.slice(1);
    }

    /**
     * Сервер требует авторизацию
     */
    onAuth() {
        this.ws.send(JSON.stringify({
            "action": "auth",
            "data": {
                "user_id": this.store.getters.user_id,
                "token" : this.store.getters.user_token,
            }
        }));

    }

    onPing() {
        this.ws.send(JSON.stringify({
            "action": "pong",
            "data": {}
        }));
    }

    onMessage_sent() {
        store.commit("updateMessageIfSent", this.message.data);
    }

    onNew_message() {
        store.commit("newMessage", this.message.data);
    }

    onMessages_read() {
        store.commit("userReadMessages", this.message.data);
    }
}