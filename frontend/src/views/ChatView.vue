<template>
    <div class="componentWrapper">


        <dialog-component></dialog-component>

        <action-menu>
            <div>
                <router-link to="/">To chats</router-link>
            </div>
            <div>Кнопка 2</div>
        </action-menu>
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

export default {
	name: 'ChatView',
	components: {DialogComponent, SendIcon, AttachIcon, MenuIcon, BackIcon, Icon, ActionMenu},
    data() {
	    return {

        }
    },
    beforeCreate() {
	    this.$store.commit("setHeaderSetting", {
            showSidebarBtn: false,
            showBackBtn: true,
            backBtnUrl: "/",
            headerTitle: "UserName",
            showActionMenu: true,
        });
    },
}

</script>

<style>

</style>
