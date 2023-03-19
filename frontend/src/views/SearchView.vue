<template>

    <div class="appWrapper">

        <app-header :input-instead-of-text="true"></app-header>

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
                    <router-link to="/">To chats</router-link>
                </div>
                <div>Кнопка 2</div>
            </action-menu>
        </div>
    </div>
</template>
<script>
import ActionMenu from "@/components/action-menu";
import DialogItem from "@/components/dialogues/Dialog-item";
import AppHeader from "@/components/headers/app-header";

export default {
    name: 'CleanTemplate',
    computed: {
        dialogues() {
            return this.$store.getters.dialogues;
        },
        searchQuery() {
            return this.$store.getters.headerInput;
        },
    },
    components: {AppHeader, DialogItem, ActionMenu},
}
</script>
<style>

</style>
