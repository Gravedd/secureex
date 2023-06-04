<template>
    <transition name="fade">
        <div class="loader-wrapper" v-if="show">
            <div class="loader">
                <div class="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name    : "loader",
    computed: {
        show() {
            return this.$store.getters.showLoader;
        }
    }
}
</script>
<style scoped>
    .loader-wrapper {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: brightness(0.15);
    }

    .lds-ellipsis {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }

    .lds-ellipsis div {
        position: absolute;
        top: 33px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: var(--main);
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .lds-ellipsis div:nth-child(1) {
        left: 8px;
        animation: lds-ellipsis1 0.8s infinite;
    }

    .lds-ellipsis div:nth-child(2) {
        left: 8px;
        animation: lds-ellipsis2 0.8s infinite;
    }

    .lds-ellipsis div:nth-child(3) {
        left: 32px;
        animation: lds-ellipsis2 0.8s infinite;
    }

    .lds-ellipsis div:nth-child(4) {
        left: 56px;
        animation: lds-ellipsis3 0.8s infinite;
    }

    @keyframes lds-ellipsis1 {
        0% {
            transform: scale(0);
        }
        50% {
            background-color: var(--main2);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes lds-ellipsis3 {
        0% {
            transform: scale(1);
        }
        50% {
            background-color: var(--main2);
        }
        100% {
            transform: scale(0);
        }
    }

    @keyframes lds-ellipsis2 {
        0% {
            transform: translate(0, 0);
        }
        25% {
            background-color: var(--main2);
        }
        100% {
            transform: translate(24px, 0);
        }
    }
</style>