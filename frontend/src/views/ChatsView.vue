<template>
    <div class="appWrapper">
        <app-header
            :show-back-btn="false"
            :show-sidebar-btn="true"
            :show-search-icon="true"
            :show-action-menu="false"
            @clickOnHeaderSearch="clickOnHeaderSearch"
        >Диалоги</app-header>

        <div class="componentWrapper">
            <div class="dialogList-wrapper" v-for="dialogue in dialogues">

                <dialog-item
                    :user_id="dialogue.user.id"
                    :user_avatar="dialogue.user.avatar"
                    :username="dialogue.user.name"
                    :last-message="dialogue.messages[0].body"
                    :last-time="dialogue.messages[0].created_at"
                    :unread_count="dialogue.unread_count"
                />

            </div>

            <div class="dialogs-empty-message" v-if="!dialogues">
                <p>Нет диалогов с другими пользователями(</p>
                <p>
                    <router-link to="/search" class="colored_text">Поиск пользователей</router-link>
                </p>
            </div>

            <action-menu/>
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
    .dialogs-empty-message {
        padding: 16px 0;
        color: var(--gray4);
    }
    .colored_text {
        color: var(--text);
    }
</style>