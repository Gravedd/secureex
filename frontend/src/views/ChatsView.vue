<template>
    <div class="appWrapper">
        <app-header :show-back-btn="false" :show-sidebar-btn="true" :show-search-icon="true" @clickOnHeaderSearch="clickOnHeaderSearch">Диалоги</app-header>

        <div class="componentWrapper">
            <div class="dialogList-wrapper" v-for="dialogue in dialogues">
                <dialog-item
                    :user_id="isMe(dialogue.user1.id) ? dialogue.user2.id : dialogue.user1.id"
                    :user_avatar="isMe(dialogue.user1.id) ? dialogue.user2.avatar : dialogue.user1.avatar"
                    :username="isMe(dialogue.user1.id) ? dialogue.user2.name : dialogue.user1.name"
                    :last-message="dialogue.messages[0].body"
                    :last-time="dialogue.messages[0].created_at"
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
    methods: {
        clickOnHeaderSearch() {
            this.$router.push("/search");
        },
        isMe(user_id) {
            return this.$store.getters.user_id === user_id;
        }
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