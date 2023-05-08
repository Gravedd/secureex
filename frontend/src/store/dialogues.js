import requests from "@/plugins/requests";
import config from "@/config";
import Cache from "@/utils/cache";
import store from "@/store/index";

export default {
    state: {
        //Диалоги юзера
        dialogues: Cache.get("dialogues"),

        messagesDialogs: {},
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
            let uid = data.user_id;
            state.messagesDialogs['dialogWithUser' + uid].push(data.message);
        },
        setDialogues(state, dialogues) {
            state.dialogues = dialogues;
            Cache.set("dialogues", dialogues);
        },
        setMessagesInDialog(state, data) {
            state.messagesDialogs['dialogWithUser' + data.with_user] = data.messages;
        },
        updateMessageIfSent(state, data) {
            let key = "dialogWithUser" + data.to_user;
            let message = state.messagesDialogs[key].find(message => message.uuid === data.uuid);
            message.id = data.message_id;
            message.body = data.body;
            message.created_at = data.created_at;
            delete message.uuid;
        },
        newMessage(state, data) {
            let uid = data.user_id;
            state.messagesDialogs['dialogWithUser' + uid].push(data);
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