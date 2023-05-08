import store from "@/store";

export default class {

    constructor(store, message, ws) {
        this.store = store;
        this.ws = ws;

        this.message = JSON.parse(message.data);
        this.type = this.getType(this.message);

        console.log(this.type)
        let methodExists = this.type in this;
        if (!methodExists) {
            return console.log(`Метода '${this.type}' не существует`);
        }

        return this[this.type]();
    }

    getType(message) {
        //console.log(`Сервер: '${message.action}';`);
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
        console.log(this.message);
        store.commit("updateMessageIfSent", this.message.data);
    }

}