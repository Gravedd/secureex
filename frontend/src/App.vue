<template>
    <router-view v-slot="{ Component }">
        <transition>
            <component :is="Component"/>
        </transition>
    </router-view>

    <app-sidebar/>

    <loader></loader>

    <image-modal/>
</template>

<script>
import AppSidebar from "@/components/ui/app-sidebar";
import store from "@/store";
import ActionMenu from "@/components/ui/action-menu";
import Loader from "@/components/ui/loader";
import ImageModal from "@/components/modals/image-modal";

export default {
    components: {ImageModal, Loader, ActionMenu, AppSidebar},
    data() {
        return {
            url: process.env.VUE_APP_APIURL,
        }
    },
    methods: {},
    beforeCreate() {
        this.$showLoader();
    },
    created() {
        store.dispatch("updateColors");

        window.addEventListener('resize', function () {
            store.dispatch("updateDeviceData");
        });
        store.dispatch("updateDeviceData");


        this.$store.dispatch("CheckAuth").then(() => {
            store.dispatch("getConversations");
            this.$hideLoader();
        }).catch(e => {
            console.log(e);
            this.$hideLoader();
        });
    },
    mounted() {}
}
</script>

<style>
    @import "assets/styles/app.css";
</style>
