<template>

    <div class="appWrapper">

        <input-header/>

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
import InputHeader from "@/components/headers/input-header";

export default {
    name: 'CleanTemplate',
    computed: {
        dialogues() {
            return this.$store.getters.dialogues;
        },
        searchQuery() {
            return this.$store.getters.headerInputValue;
        },
    },
    components: {InputHeader, DialogItem, ActionMenu},
    beforeCreate() {
        this.$store.commit("inputInsteadOfText", true);
    },
    beforeUnmount() {
        this.$store.commit("inputInsteadOfText", false);
    }
}
</script>
<style>

</style>
