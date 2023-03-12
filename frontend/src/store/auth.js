export default {
    state: {
        "user_id"   : null,
        "isAuthorized": false,
        "user_name" : null,
        "user_email": null,
        "user_token": null,
    },
    getters: {
        isAuthorized: state => state.isAuthorized,
        user_id: state => state.user_id,
        user_name: state => state.user_name,
        user_email: state => state.user_email,
        user_token: state => state.user_token,
    },
    mutations: {
        isAuthorized: (state, value) => {
            state.isAuthorized = value;
        },
        successAuth(state, user) {},
        authFailed(state) {},
    },
    actions: {
        async Register(context, credentials) {},
        async Login(context, credentials) {},
        async CheckAuth(context) {},
        async Logout(context) {},
    }
}