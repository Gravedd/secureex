<template>
    <router-view v-slot="{ Component }">
        <transition>
            <component :is="Component"/>
        </transition>
    </router-view>

    <app-sidebar/>

    <loader></loader>
</template>

<script>
import AppSidebar from "@/components/app-sidebar";
import store from "@/store";
import ActionMenu from "@/components/action-menu";
import Loader from "@/components/loader";

export default {
    components: {Loader, ActionMenu, AppSidebar},
    data() {
        return {

        }
    },
    methods: {

    },
    beforeCreate() {
        this.$showLoader();
    },
    created() {
        store.dispatch("updateColors");

        window.addEventListener('resize',function() {
            store.dispatch("updateDeviceData");
        });
        store.dispatch("updateDeviceData");
    },
    mounted() {
        this.$hideLoader();
        this.$store.dispatch("CheckAuth");
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
.colored_gradient {
    background: linear-gradient(90.16deg, var(--main) -31.7%, var(--main2) 136.91%);
}
.flex {
    display: flex;
}
.componentWrapper {

}
.basePadding {
    padding-left: 16px;
    padding-right: 16px;
}
.nice-scrollbar::-webkit-scrollbar {
    width: 2px;
    -webkit-appearance: none;
}
.nice-scrollbar::-webkit-scrollbar-track {
    background: none;        /* цвет зоны отслеживания */
    background-clip: content-box;
}
.nice-scrollbar::-webkit-scrollbar-thumb {
    background-color: var(--gray5);
}
/* Стили попапов sweetAlert */
.swal2-popup {
    color: var(--text) !important;
    background-color: var(--bg2) !important;
}
.swal2-styled.swal2-confirm {
    background-color: var(--main2) !important;
}
.col-1-1 {
    width: 100%;
    padding: 16px 16px;
}
.col-1-2 {
    width: 50%;
}

.flex_row {
    display: flex;
    flex-direction: row;
}
    /* Анимации */
/* fade */
.fade-enter-active, .fade-leave-active {
    transition: opacity .25s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

@media (min-width: 1000px) {
  .componentWrapper {
      padding: 0 100px;
  }
  header {
    padding: 0 100px !important;
  }
}
@media (min-width: 1500px) {
  .componentWrapper {
    padding: 0 400px;
  }
  header {
    padding: 0 400px !important;
  }
}
</style>
