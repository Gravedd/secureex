import router from "@/router";
import config from "@/config";
import requests from "@/plugins/requests";
import Swal from "sweetalert2";
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
        },
    },
    actions: {
        async Register(context, credentials) {
            store.commit("showLoader");

            let response = await requests.post(config.api + "register", credentials);

            store.commit("hideLoader");

            let data = await response.json();
            if (response.ok) {
                //успешная регистрация
                await context.dispatch("userSuccessAuthorized", data);
                return true;
            }

            Swal.fire({
                "title": "Ошибка!",
                "text" : data.message,
            })
            return {
                "status": false,
                "errors": data.errors,
            }
        },

        async Login(context, credentials) {
            store.commit("showLoader");
            let response = await requests.post(config.api + "login", credentials);
            store.commit("hideLoader");

            let data = await response.json();
            if (response.ok) {
                //успешная авторизация
                await context.dispatch("userSuccessAuthorized", {
                    "id"   : data.user.id,
                    "name" : data.user.name,
                    "email": data.user.email,
                    "token": data.token,
                });
                return true;
            }

            Swal.fire({
                "title": "Ошибка!",
                "text" : data.message,
            })

            return {
                "status": false,
                "errors": data.errors,
            }
        },

        async CheckAuth(context) {
            store.commit("showLoader");
            if (!context.getters.user_token) {
                return await context.dispatch("userIsNotAuthorized");
            }

            let response = await requests.get(config.api + "user", {
                "Authorization": "Bearer " + context.getters.user_token
            });
            store.commit("hideLoader");

            if (!response.ok) {
                return await context.dispatch("userIsNotAuthorized");
            }

            let data = await response.json();
            await context.dispatch("userSuccessAuthorized", data);
        },

        async Logout(context) {
            store.commit("showLoader");
            if (!context.getters.user_token) {
                return await context.dispatch("userIsNotAuthorized");
            }

            let response = await requests.get(config.api + "logout", {
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