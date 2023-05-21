import requests from "@/plugins/requests";
import config from "@/config";
import Cache from "@/utils/cache";
import store from "@/store/index";
import router from "@/router";

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
            let key = 'dialogWithUser' + data.user_id;
            if (!state.messagesDialogs[key]) {
                state.messagesDialogs[key] = [];
            }

            state.messagesDialogs[key].push(data);
            if (router.currentRoute._rawValue.name === "chat") {
                return ;
            }

            //Обновить кол-во не прочитанных
            let dialog = state.dialogues.find(dialogue => dialogue.user.id === data.user_id);
            if (!dialog) {
                console.log("TODO: Создать чат!");//TODO: Создать чат
                return ;
            }
            dialog.unread_count = !Number.isInteger(dialog.unread_count) ? 1 : dialog.unread_count + 1;
            //Установить сообщение как последнее
            dialog.messages[0] = data;
        },
        readAllDialogMessagesLocal(state, with_user) {
            with_user = parseInt(with_user);
            state.messagesDialogs['dialogWithUser' + with_user].forEach(elem => {
                elem.read = 1;
            });
            let dialog = state.dialogues.find(dialogue => dialogue.user.id === with_user);
            if (dialog) {
                dialog.unread_count = 0;
            }
        },
        userReadMessages(state, data) {
            if (!state.messagesDialogs['dialogWithUser' + data.from_id]) {
                return ;
            }

            state.messagesDialogs['dialogWithUser' + data.from_id].forEach(message => {
                if (message.id <= data.lastMessageId) {
                    message.read = 1;
                }
            });
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
        },
        async markAllMessagesMarked(context, data) {
            let lastMessageId;

            context.getters.getDialogById['dialogWithUser' + data.dialogWith].findLast(message => {
                return lastMessageId = message.id;
            });

            context.commit("readAllDialogMessagesLocal", data.dialogWith);
            context.getters.ws.send(JSON.stringify({
                action: "allMessagesRead",
                data: {
                    "dialogWith"   : data.dialogWith,
                    "lastMessageId": lastMessageId,
                }
            }));
        }
    },
    modules: {},
}