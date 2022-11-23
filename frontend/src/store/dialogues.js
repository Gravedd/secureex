export default {
    state: {
        //Диалоги юзера
        dialogues: [
            {
                id: 1,
                user_id: 2,
                user_name: "Lorem Ipsum",
                lastMessage: "Lorem ipsum dolor sit amet, consectetur-adipiscy...",
                lastTime: "14:15",
            },
            {
                id: 2,
                user_id: 3,
                user_name: "Lorem2 Ipsum2",
                lastMessage: "Lorem2 ipsum dolor amet, consectetur-adipiscy...",
                lastTime: "14:15",
            },
        ],
    },
    getters: {
        dialogues: (state) => {
            return state.dialogues
        },
    },
    mutations: {},
    actions: {},
    modules: {},
}