<template>
    <div class="chat-wrapper" :style="{'height': `${clientHeight - 40}px`}">
        <dialog-messages :with_user="with_user" ref="dialogMessages"/>
        <message-write :with_user="with_user"/>
    </div>
</template>

<script>
import MessageWrite from "@/components/dialogues/message-write";
import DialogMessages from "@/components/dialogues/Dialog-messages";

export default {
    name: "Dialog-component",
    components: {DialogMessages, MessageWrite},
    props: ["with_user"],
    computed: {
        clientWidth() {
            return this.$store.getters.clientWidth;
        },
        clientHeight() {
            return this.$store.getters.clientHeight;
        },
        innerHeight() {
            return this.$store.getters.innerHeight;
        }
    },
    methods: {
        onGetMessages() {
            this.$refs.dialogMessages.scrollBlockDown("instant");
        }
    }
}
</script>
<style scoped>
.chat-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 528px;
}
</style>