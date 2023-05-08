<template>
    <div class="appWrapper">

        <app-header>UserName</app-header>


        <div class="componentWrapper">
            <dialog-component :with_user="with_user"></dialog-component>

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
import BackIcon from "@/components/icons/backIcon";
import MenuIcon from "@/components/icons/menuIcon";
import AttachIcon from "@/components/icons/attachIcon";
import SendIcon from "@/components/icons/sendIcon";
import store from "@/store"
import DialogComponent from "@/components/dialogues/Dialog-component";
import AppHeader from "@/components/headers/app-header";

export default {
	name: 'ChatView',
	components: {AppHeader, DialogComponent, SendIcon, AttachIcon, MenuIcon, BackIcon, Icon, ActionMenu},
    data() {
	    return {
            with_user: this.$route.params.id,
        }
    },
    methods: {

    },
    beforeMount() {
	    this.$showLoader();
        store.dispatch("getMessages", this.with_user);
    },
    mounted() {
        this.$hideLoader();
    }
}

</script>

<style>

</style>
