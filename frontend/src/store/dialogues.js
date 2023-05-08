import requests from "@/plugins/requests";
import config from "@/config";
import Cache from "@/utils/cache";

export default {
    state: {
        //Диалоги юзера
        dialogues: Cache.get("dialogues"),
        //Диалог с юзером 1
        messagesDialogs: {
            "dialogWithUser1": [
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "received"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "sent"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "received"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "sent"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "received"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "sent"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "received"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "sent"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "received"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "received"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "sent"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "sent"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "received"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "received"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "sent"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "received"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "received"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "sent"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "sent"
                },{
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "received"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "received"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "sent"
                },
                {
                    id: 1,
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                    time: "14:15",
                    type: "sent"
                },
            ]
        },
    },
    getters: {
        dialogues: (state) => {
            return state.dialogues
        },
        getDialogById: (state) => {
            return state.messagesDialogs
        }
    },
    mutations: {
        addMessage (state, data) {
            let uid = data.user_id
            state.messagesDialogs['dialogWithUser' + uid].push(data)
        },
        setDialogues(state, dialogues) {
            state.dialogues = dialogues;
            Cache.set("dialogues", dialogues);
        }
    },
    actions: {
        async getConversations (context) {
            let response = await requests.get(config.api + "user/conversations/all");
            let data = await response.json();
            if (!response.ok) {
                return false;
            }

            context.commit("setDialogues", data.conversations);

            return data.conversations;
        }
    },
    modules: {},
}