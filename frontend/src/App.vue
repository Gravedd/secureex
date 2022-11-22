<template>
    <!--  <nav>
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
      </nav>-->
    <app-header @openSidebar="openSidebar" @openMenu="openMenu">{{ this.$route.name }}</app-header>

    <router-view/>

    <app-sidebar :opened="isSidebarOpened" @closeSidebar="closeSidebar"></app-sidebar>

</template>
<script>
import AppSidebar from "@/components/app-sidebar";
import store from "@/store";
import AppHeader from "@/components/app-header";
import ActionMenu from "@/components/action-menu";

export default {
    components: {ActionMenu, AppHeader, AppSidebar},
    data() {
        return {
            isSidebarOpened: false,
            isActionMenuOpened: false,
        }
    },
    methods: {
        //Обновить цвета в css
        updateColors() {
            let colors = store.getters.colors;
            let keys = Object.keys(colors);
            for (let cssVar of keys) {
                document.documentElement.style.setProperty(cssVar, colors[cssVar]);
            }
        },
        //Сайдбар
        openSidebar() {
            this.isSidebarOpened = true;
        },
        closeSidebar() {
            this.isSidebarOpened = false;
        },
        //Экшн меню
        openMenu() {
            this.$store.commit("actionMenuStatus", true);
        },
    },
    created() {
        this.updateColors();
    }
}
</script>

<style>
/* CSS Переменные необходимо продублировать в store (appColors) - нужно для работы подсказок ide */
:root {
    --bg: #1A1126;
    --bg2: #332B3E;
    --bg3: #4C405B;
    --bg4: #857E90;
    --bg5: #fff;

    --text: #FFFFFF;

    --gray1: #F0F0F0;
    --gray2: #F3F3F3;
    --gray3: #F5F5F5;
    --gray4: #D9D9D9;
    --gray5: #5E5369;


    --main: #5C04BB;
    --main2: #C6009A;
}

@font-face {
    font-family: 'Roboto';
    src: url('~@/assets/fonts/Roboto.ttf');
    font-weight: 360;
}

#app {
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    color: var(--text);
    background-color: var(--bg);
    font-size: 14px;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
/* Стили попапов sweetAlert */
.swal2-popup {
    color: var(--text) !important;
    background-color: var(--bg2) !important;
}
.swal2-styled.swal2-confirm {
    background-color: var(--main2) !important;
}
</style>