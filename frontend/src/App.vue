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

        this.$store.dispatch("CheckAuth");

        store.dispatch("getConversations");
    },
    mounted() {
        this.$hideLoader();
    }
}
</script>

<style>
    @import "assets/styles/app.css";
</style>
