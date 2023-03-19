<template>
    <div class="appWrapper">
        <app-header :show-back-btn="false" :show-sidebar-btn="true">Диалоги</app-header>

        <div class="componentWrapper">
            <div class="dialogList-wrapper" v-for="dialogue in dialogues">
                <dialog-item
                        :user_id="dialogue.user_id"
                        :username="dialogue.user_name"
                        :last-message="dialogue.lastMessage"
                        :last-time="dialogue.lastTime"
                />
            </div>

            <action-menu>
                <div>
                    <router-link to="/clean">Чистый</router-link>
                </div>
                <div>
                    <router-link to="/chat">Перейти в диалог</router-link>
                </div>
            </action-menu>
        </div>
    </div>
</template>

<script>
import ActionMenu from "@/components/action-menu";
import DialogItem from "@/components/dialogues/Dialog-item";
import AppHeader from "@/components/headers/app-header";

export default {
    name: "ChatsView",
    components: {AppHeader, DialogItem, ActionMenu},
    computed: {
        dialogues() {
            return this.$store.getters.dialogues;
        },
    },
    beforeCreate() {

    },
    beforeUnmount() {

    }
}
</script>

<style scoped>
    .dialogList-wrapper {
        margin-top: 4px;
        width: 100%;
    }
</style>