export default {
    state: {
        //Диалоги юзера
        dialogues: [
            {
                id: 1,
                user_id: 2,
                avatar: "/images/avatars/avatar.jpg",
                user_name: "Jason Gibson",
                lastMessage: "Lorem ipsum dolor sit amet, consectetur-adipiscy...",
                lastTime: "14:15",
            },
            {
                id: 2,
                user_id: 3,
                user_name: "Bruce Schmidt",
                lastMessage: "Lorem2 ipsum dolor amet, consectetur-adipiscy...",
                lastTime: "14:15",
            },
        ],
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
    },
    actions: {},
    modules: {},
}