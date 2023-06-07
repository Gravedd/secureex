import router from "@/router";
import config from "@/config";
import requests from "@/plugins/requests";
import store from "@/store";

export default {
    state: {
        "user_id"      : null,
        "isAuthorized" : !!localStorage.getItem('token'),
        "user_name"    : null,
        "user_nickname": null,
        "user_email"   : null,
        "user_token"   : localStorage.getItem('token') ?? null,
        "user_avatar"  : null,
    },
    getters: {
        isAuthorized: state => state.isAuthorized,
        user_id: state => state.user_id,
        user_name: state => state.user_name,
        user_email: state => state.user_email,
        user_token: state => state.user_token,
        user_avatar: state => state.user_avatar,
        user_nickname: state => state.user_nickname,
    },
    mutations: {

        isAuthorized: (state, value) => state.isAuthorized = value,
        setUserAvatar: (state, value) => state.user_avatar = value,

        successAuth(state, user) {
            state.isAuthorized = true;

            state.user_id = user.id;
            state.user_nickname = user.nickname;
            state.user_name = user.name;
            state.user_email = user.email;
            state.user_avatar = user.avatar;
            if (user.token) {
                state.user_token = user.token;
                localStorage.setItem("token", user.token);
            }
            store.dispatch("connect", user);
        },
        authFailed(state) {
            state.isAuthorized = false;
            state.user_id = null;
            state.user_name = null;
            state.user_nickname = null;
            state.user_email = null;
            state.user_token = null;
            state.user_avatar = null;
            localStorage.removeItem("token");
            localStorage.removeItem("dialogues");
        },
    },
    actions: {
        async Register({ commit, dispatch }, credentials) {
            commit("showLoader");
            try {
                const response = await requests.post(config.api + "register", credentials);
                const data = await response.json();
                if (response.ok) {
                    return await dispatch("userSuccessAuthorized", data);
                }
                throw new Error(data.message);
            } finally {
                commit("hideLoader");
            }
        },

        async Login({ commit, dispatch }, credentials) {
            commit("showLoader");
            try {
                let response = await requests.post(config.api + "login", credentials);
                let data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }

                await dispatch("userSuccessAuthorized", data.user);
                return true;
            } finally {
                commit("hideLoader");
            }
        },

        async CheckAuth(context) {
            return new Promise(async (resolve, reject) => {

                store.commit("showLoader");
                if (!context.getters.user_token) {
                    reject("Нет токена авторизации");
                    return await context.dispatch("userIsNotAuthorized");
                }

                let response = await requests.get(config.api + "user", {
                    "Authorization": "Bearer " + context.getters.user_token
                });
                store.commit("hideLoader");

                if (!response.ok) {
                    await context.dispatch("userIsNotAuthorized");
                    reject("Не удалось авторизоваться на сервере по токену!");
                    return;
                }

                let data = await response.json();
                await context.dispatch("userSuccessAuthorized", data);
                resolve();
            });
        },

        async Logout(context) {
            store.commit("showLoader");
            if (!context.getters.user_token) {
                return await context.dispatch("userIsNotAuthorized");
            }

            let response = await requests.post(config.api + "logout", {},{
                "Authorization": "Bearer " + context.getters.user_token
            });

            return await context.dispatch("userIsNotAuthorized");
        },

        userSuccessAuthorized(context, user) {
            context.commit("successAuth", user);
            requests.baseHeaders["Authorization"] = "Bearer " + context.getters.user_token;
        },

        async userIsNotAuthorized(context) {
            context.commit("authFailed");
            await router.push('/login');
        }
    }
}