import requests from "@/plugins/requests";
import config from "@/config";
import Cache from "@/utils/cache";
import store from "@/store/index";
import router from "@/router";
import Users from "@/requests/users";

export default {
    state: {
        //Диалоги юзера
        dialogues: Cache.get("dialogues"),

        messagesDialogs: {},
        typing: {}
    },
    getters: {
        dialogues: (state) => { return state.dialogues },
        getDialogById: (state) => { return state.messagesDialogs },
        getTyping: (state) => { return state.typing }
    },
    mutations: {
        addMessage(state, data) {
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
            message.created_at = data.created_at ?? 0;
            delete message.uuid;

            let dialog = state.dialogues.find(dialogue => dialogue.user.id == data.to_user);
            if (!dialog) {
                store.dispatch("createLocalChat", {
                    "with_user": data.to_user,
                    "message": data,
                }).then(r =>
                    store.commit("updateMessageIfSent", data)
                );
                return ;
            }
            dialog.messages[0] = data;
        },
        newMessage(state, data) {
            let key = 'dialogWithUser' + data.user_id;
            if (!state.messagesDialogs[key]) {
                state.messagesDialogs[key] = [];
            }

            state.messagesDialogs[key].push(data);
            if (router.currentRoute._rawValue.name === "chat") {
                return;
            }

            //Обновить кол-во не прочитанных
            let dialog = state.dialogues.find(dialogue => dialogue.user.id === data.user_id);
            if (!dialog) {
                store.dispatch("createLocalChat", {
                    "with_user": data.user_id,
                    "message": data,
                }).then(r =>
                    store.commit("newMessage", data)
                );
                return ;
            }
            dialog.unread_count = !Number.isInteger(dialog.unread_count) ? 1 : dialog.unread_count + 1;
            //Установить сообщение как последнее
            dialog.messages[0] = data;
        },
        readAllDialogMessagesLocal(state, with_user) {
            with_user = parseInt(with_user);
            state.messagesDialogs['dialogWithUser' + with_user].forEach(elem => {
                if (elem.user_id !== store.getters.user_id) {
                    elem.read = 1;
                }
            });
            let dialog = state.dialogues.find(dialogue => dialogue.user.id === with_user);
            if (dialog) {
                dialog.unread_count = 0;
            }
        },
        userReadMessages(state, data) {
            if (!state.messagesDialogs['dialogWithUser' + data.from_id]) {
                return;
            }

            state.messagesDialogs['dialogWithUser' + data.from_id].forEach(message => {
                if ((message.id <= (data.lastMessageId + 1)) && (message.user_id !== state.user_id)) {
                    message.read = 1;
                }
            });
        },
        userTyping(state, data) {
            state.typing["user_" + data.user_id] = true;

            setTimeout(() => {
                state.typing["user_" + data.user_id] = false;
            }, 2000);
        },
        addNewChat(state, chat) {
            state.dialogues.push(chat);
        }
    },
    actions: {
        async getConversations(context) {
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
            store.dispatch("sendWs", {
                action: "allMessagesRead",
                data  : {
                    "dialogWith"   : data.dialogWith,
                    "lastMessageId": lastMessageId,
                }
            });
        },

        async createLocalChat(context, data) {
            let user_id = data.with_user;
            let user = await Users.getUser(user_id);
            if (!user) {
                console.log("Ошибка createLocalChat(). Юзер `user_id` не найден!");
            }

            let chat = {
                id: null,
                messages: [data.message ?? {}],
                unread_count: 0,
                user: user,
            }

            context.commit("addNewChat", chat);
        }
    },
    modules: {},
}