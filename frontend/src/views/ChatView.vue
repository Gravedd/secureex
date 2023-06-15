<template>
    <div class="appWrapper">
        <chat-header
            :username="user.name"
            :is-user-typing="typing['user_' + with_user]"
            user-online-data="Онлайн"
            :avatar-src="user.avatar"
            :user_id="with_user"
        />

        <div class="componentWrapper">
            <dialog-component :with_user="with_user" ref="dialogComponent"></dialog-component>
            <action-menu>
                <div>
                    <router-link :to="{ name: 'user.profile', params: {id: with_user} }">Перейти в профиль</router-link>
                </div>
                <!-- TODO:  <div class="red-text">Удалить переписку</div>-->
            </action-menu>
        </div>
    </div>
</template>
<script>

import ActionMenu from "@/components/ui/action-menu";
import Icon from "@/components/icons/icon";
import BackIcon from "@/components/icons/backIcon";
import MenuIcon from "@/components/icons/menuIcon";
import AttachIcon from "@/components/icons/attachIcon";
import SendIcon from "@/components/icons/sendIcon";
import store from "@/store"
import DialogComponent from "@/components/chat/Dialog-component";
import AppHeader from "@/components/headers/app-header";
import config from "@/config";
import ChatHeader from "@/components/headers/chat-header";

export default {
	name: 'ChatView',
	components: {ChatHeader, AppHeader, DialogComponent, SendIcon, AttachIcon, MenuIcon, BackIcon, Icon, ActionMenu},
    data() {
	    return {
            with_user: this.$route.params.id,
            user: {},
        }
    },
    computed: {
        typing() {
            return this.$store.getters.getTyping;
        }
    },
    methods: {
        onGetMessages() {
            this.$hideLoader();
            this.$refs.dialogComponent.onGetMessages();
            this.$store.dispatch("markAllMessagesMarked", {
                dialogWith: this.with_user
            })
            this.$store.commit("readAllDialogMessagesLocal", this.with_user);
        },
        async getUser() {
            let response = await this.$request.get(config.api + "user/" + this.with_user);
            if (!response.ok) {
                return alert("Не удалось получить пользователя");
            }
            this.user = await response.json();

        }
    },
    beforeMount() {
        this.$showLoader();
        this.getUser();
        store.dispatch("getMessages", this.with_user).then(() => this.onGetMessages());
    },
    mounted() {

    }
}

</script>

<style>

</style>
