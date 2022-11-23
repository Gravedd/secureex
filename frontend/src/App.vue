<template>
    <app-header @openSidebar="openSidebar">{{ this.$route.name }}</app-header>

    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component"/>
        </transition>
    </router-view>

    <app-sidebar :opened="isSidebarOpened" @closeSidebar="closeSidebar"/>

    <loader></loader>
</template>

<script>
import AppSidebar from "@/components/app-sidebar";
import store from "@/store";
import AppHeader from "@/components/app-header";
import ActionMenu from "@/components/action-menu";
import Loader from "@/components/loader";

export default {
    components: {Loader, ActionMenu, AppHeader, AppSidebar},
    data() {
        return {
            isSidebarOpened: false,
        }
    },
    methods: {
        openSidebar() { this.isSidebarOpened = true },
        closeSidebar() { this.isSidebarOpened = false },
    },
    beforeCreate() {
        this.$showLoader();
    },
    created() {
        store.dispatch("updateColors");
    },
    mounted() {
        this.$hideLoader();
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

a {
    color: var(--text);
    text-decoration: none;
}
.componentWrapper {

}
.basePadding {
    padding-left: 16px;
    padding-right: 16px;
}
/* Стили попапов sweetAlert */
.swal2-popup {
    color: var(--text) !important;
    background-color: var(--bg2) !important;
}
.swal2-styled.swal2-confirm {
    background-color: var(--main2) !important;
}

    /* Анимации */
/* fade */
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>