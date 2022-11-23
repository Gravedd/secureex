<template>
    <action-menu>
        <div>
            <router-link to="/clean">To clean</router-link>
        </div>
    </action-menu>

    <div class="dialogList-wrapper" v-for="dialogue in dialogues">
        <dialog-item
            :user_id="dialogue.user_id"
            :username="dialogue.user_name"
            :last-message="dialogue.lastMessage"
            :last-time="dialogue.lastTime"
        />
    </div>
</template>

<script>
import ActionMenu from "@/components/action-menu";
import DialogItem from "@/components/dialogues/Dialog-item";

export default {
    name: "ChatsView",
    components: {DialogItem, ActionMenu},
    computed: {
        dialogues() {
            return this.$store.getters.dialogues;
        },
    }
}
</script>

<style scoped>
    .dialogList-wrapper {
        margin-top: 4px;
        width: 100%;
    }
</style>