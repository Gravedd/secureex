<template>
    <transition name="slide">
        <div class="menuwrapper-flex" @click="$emit('closeMenu')" v-if="opened">
            <div class="menuwrapper" @click="clickOnMenu">
                <div>Действие 1</div>
                <div>Закрыть</div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: "action-menu",
    data() {
        return {

        }
    },
    props: {
        opened : false,
    },
    methods: {
        clickOnMenu(event) { event.stopPropagation(); }//Клик на сайдбар
    },
    emits: {
        closeMenu: null,
    }
}
</script>
<style scoped>
    .menu-background {
        position: fixed;
        backdrop-filter: brightness(0.9);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .menuwrapper-flex {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        padding: 8px;
    }
    .menuwrapper {
        background-color: var(--gray5);
        width: 150px;
    }
    .menuwrapper div {
        width: 100%;
        height: 40px;
        padding: 0 8px;
        line-height: 40px;
    }
    .menuwrapper div:hover, .menuwrapper div:active {
        backdrop-filter: brightness(0.95);
    }
    .slide-leave-active, .slide-enter-active  {
        transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
    }
    .slide-enter-from, .slide-leave-to {
        transform: translateX(30px);
        opacity: 0;
    }
</style>