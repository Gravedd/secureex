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
                }
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
        },
        setMessagesInDialog(state, data) {
            state.messagesDialogs['dialogWithUser' + data.with_user] = data.messages;
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
        },
        async getMessages(context, with_user) {
            let response = await requests.get(config.api + "conversations/" + with_user);
            let data = await response.json();
            if (!response.ok) {
                return false;
            }

            context.commit("setMessagesInDialog", {"with_user": with_user, "messages": data.messages});

            return data.messages;
        }
    },
    modules: {},
}