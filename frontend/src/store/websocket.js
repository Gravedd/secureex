import config from "@/config";
import wsMessageHandler from "@/utils/wsMessageHandler";

export default {
    state: {
        ws: null,
    },
    getters: {
        ws: (state) => {
            return state.ws
        },
    },
    mutations: {},
    actions: {
        connect(context, user) {
            context.state.ws = new WebSocket(config.ws);

            /*context.state.ws.onerror = function (error) {
                location.reload()
            }*/

            context.state.ws.onclose = event => {
                console.log('Переподключение...');
                if (context.getters.isAuthorized === true) {
                    context.dispatch('connect');
                }
            }

            /*context.state.ws.send();*/
            context.state.ws.onmessage = message => {
                new wsMessageHandler(context, message, context.state.ws)
            }

            window.onbeforeunload = () => {
                context.state.ws.close(1000, 'Tab or browser closed');
            }
        }
    },
}