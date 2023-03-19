<template>
    <div class="appWrapper">

        <app-header></app-header>

        <div class="componentWrapper">

            <div class="authwrapper flex-center">
                <icon class="authLogo" width="97" height="97" viewBox="0 0 97 97"><LogoIcon/></icon>
                <h3 class="authHeader">АВТОРИЗАЦИЯ</h3>
                <div class="authinputswrap">
                    <div v-if="loginOrRegister">
                        <input type="text" placeholder="Почта" autocomplete="off" v-model="email">
                        <input type="password" placeholder="Пароль" v-model="password">
                        <input class="colored_gradient" type="submit" value="Войти" @click="login">
                        <a class="resetpassbtn">Забыли пароль?</a>
                    </div>
                    <div v-if="!loginOrRegister">
                        <input type="text" placeholder="Никнейм" autocomplete="off" v-model="reg_name">
                        <input type="text" placeholder="Почта" autocomplete="off" v-model="reg_email">
                        <input type="password" placeholder="Пароль" v-model="reg_password">
                        <input type="password" placeholder="Повтор пароля" v-model="reg_password_confirm">
                        <input class="colored_gradient" type="submit" value="Создать аккаунт" @click="register">
                    </div>
                </div>

                <div class="auth_regBtn_wrapper" v-if="loginOrRegister">
                    <div>Не зарегистрированы?</div>
                    <div class="regbtn" @click="toggleLoginOrRegister">Создать аккаунт</div>
                </div>
                <div class="auth_regBtn_wrapper small" v-if="!loginOrRegister">
                    <div>Уже зарегистрированы?</div>
                    <div class="regbtn" @click="toggleLoginOrRegister">Войти</div>
                </div>
            </div>
            <action-menu>
                <div>
                    <router-link to="/">To chats</router-link>
                </div>
                <div>Кнопка 2</div>
            </action-menu>

        </div>
    </div>
</template>
<script>

import ActionMenu from "@/components/action-menu";
import Icon from "@/components/icons/icon";
import LogoIcon from "@/components/icons/LogoIcon";
import AppHeader from "@/components/headers/app-header";

export default {
	name: 'AuthView',
    data() {
        return {
            loginOrRegister: false,
            //Авторизация
            "email": "",
            "password": "",
            //Регистрация
            "reg_name": "",
            "reg_email": "",
            "reg_password": "",
            "reg_password_confirm": "",
            "reg_errors": {},
        }
    },
    methods: {
	    toggleLoginOrRegister() { this.loginOrRegister = !this.loginOrRegister },
        async register() {
            let result = await this.$store.dispatch("Register", {
                "name"                 : this.reg_name,
                "email"                : this.reg_email,
                "password"             : this.reg_password,
                "password_confirmation": this.reg_password_confirm,
            });
            /*if (!await result.status) {
                this.reg_errors = result.errors
            }*/
        },
        async login() {
            let result = await this.$store.dispatch("Login", {
                "email"   : this.email,
                "password": this.password,
            })
        }
    },
	components: {AppHeader, CleanHeader, LogoIcon, Icon, ActionMenu}
}

</script>

<style>
.authwrapper {
    display: flex;
    padding-top: 40px;
    flex-direction: column;
    align-items: center;
}
.authLogo {
    margin-bottom: 40px;
}
.authHeader {
    height: 30px;
    line-height: 30px;
    font-weight: lighter;
    margin-bottom: 12px;
}
.authinputswrap {
    width: 70%;
    text-align: center;
}
.authinputswrap input {
    width: 100%;
    height: 30px;
    margin-bottom: 11px;
    border-radius: 8px;
    padding: 0 8px;
    border: none;
    background-color: var(--bg2);
}
.authinputswrap input[type="submit"] {
    width: auto;
    color: var(--text);
}
.resetpassbtn {
    width: 100%;
    display: block;
    font-size: 10px;
    text-align: right;
}
.auth_regBtn_wrapper {
    margin-top: 73px;
    font-size: 11px;
    text-align: center;
}
.auth_regBtn_wrapper.small {
    margin-top: 16px;
}
.auth_regBtn_wrapper .regbtn {
    border: 2px solid var(--main);
    border-radius: 8px;
    padding: 8px 16px;
    margin-top: 9px;
    transition: 0.3s;
    cursor: pointer;
}
.regbtn:hover {
    background-color: var(--main);
}
</style>
