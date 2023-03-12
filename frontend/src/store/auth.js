import router from "@/router";
import config from "@/config";
import requests from "@/plugins/requests";
import Swal from "sweetalert2";

export default {
    state: {
        "user_id"     : null,
        "isAuthorized": !!localStorage.getItem('token'),
        "user_name"   : null,
        "user_email"  : null,
        "user_token"  : localStorage.getItem('token') ?? null,
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

        successAuth(state, user) {
            state.isAuthorized = true;

            state.user_id = user.id;
            state.user_name = user.name;
            state.user_email = user.email;
            if (user.token) {
                state.user_token = user.token;
                localStorage.setItem("token", user.token);
            }
        },
        authFailed(state) {},
    },
    actions: {
        async Register(context, credentials) {
            let response = await requests.post(config.api + "register", credentials);
            let data = await response.json();
            if (response.ok) {
                //успешная регистрация
                await context.dispatch("userSuccessAuthorized", data);
                return alert("успешно");
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
            let response = await requests.post(config.api + "login", credentials);
            let data = await response.json();
            if (response.ok) {
                //успешная авторизация
                await context.dispatch("userSuccessAuthorized", {
                    "id": data.user.id,
                    "name": data.user.name,
                    "email": data.user.email,
                    "token": data.token,
                });
                return alert("успешно вошел");
            }

            Swal.fire({
                "title": "Ошибка!",
                "text": data.message,
            })

            return {
                "status": false,
                "errors": data.errors,
            }
        },

        async CheckAuth(context) {

            if (!context.getters.user_token) {
                return await context.dispatch("userIsNotAuthorized");
            }

            let response = await requests.get(config.api + "user", {
                "Authorization": "Bearer " + context.getters.user_token
            });

            if (!response.ok) {
                return await context.dispatch("userIsNotAuthorized");
            }
            let data = await response.json();
            await context.dispatch("userSuccessAuthorized", data);
        },

        async Logout(context) {

        },

        userSuccessAuthorized(context, user) {
            context.commit("successAuth", user);
            requests.baseHeaders["Authorization"] = "Bearer " + context.getters.user_token;
        },

        async userIsNotAuthorized() {
            await router.push('/login');
        }
    }
}