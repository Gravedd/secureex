import config from "@/config";
import wsMessageHandler from "@/utils/wsMessageHandler";

export default {
    state: {
        ws: null,
        wsAuthorized: false,
        wsQueue: [],
    },
    getters: {
        ws: (state) => {
            return state.ws
        },
        wsAuthorized: (state) => {
            return state.wsAuthorized
        },
        wsQueue: (state) => {
            return state.wsQueue
        },
    },
    mutations: {
        wsSuccessAuthorized (state, data) {
            state.wsAuthorized = true;
        },
        wsClosed (state, data) {
            state.wsAuthorized = false;
        },
        addQueue (state, queue) {
            state.wsQueue.push(queue);
        },
    },
    actions: {
        connect(context, user) {
            context.state.ws = new WebSocket(config.ws);

            /*context.state.ws.onerror = function (error) {
                location.reload()
            }*/
            let interval = setInterval(function () {
                context.dispatch("sendAllQueues");
            }, 1000);

            context.state.ws.onclose = event => {
                console.log('Переподключение...');
                context.commit("wsClosed");
                clearInterval(interval);
                if (context.getters.isAuthorized === true) {
                    context.dispatch('connect');
                }
            }

            context.state.ws.onmessage = message => {
                new wsMessageHandler(context, message, context.state.ws)
            }

            window.onbeforeunload = () => {
                context.commit("wsClosed");
                context.state.ws.close(1000, 'Tab or browser closed');
            }
        },

        sendWs(context, data) {
            let action = data.action ?? "no-action";
            data = JSON.stringify(data);

            if (!context.getters.wsAuthorized && action !== "auth") {
                return context.commit("addQueue", data);
            }

            context.getters.ws.send(data);
        },

        sendAllQueues(context, data) {
            context.state.wsQueue.forEach((queue, key) => {
                //console.log("Отложенная отправка", queue);
                context.dispatch("sendWs", queue);
                delete context.state.wsQueue[key];
            });
        }
    },
}