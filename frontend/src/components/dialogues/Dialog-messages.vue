<template>
    <div class="basePadding messages-wrapper">

        <div
            v-for="message in messages"
            class="message-wrapper"
            :class="{'message-sent' : message.type === 'sent', 'message-received' : message.type === 'received'}"
        >
            <div class="message-text">{{ message.text }}</div>
            <div class="message-time">{{ message.time }}</div>
        </div>
    </div>
</template>
<script>

import store from "@/store";
export default {
    name: "Dialog-messages",
    computed: {
        messages() {
            return store.getters.getDialogById["dialogWithUser1"];
        },
    }
}
</script>
<style scoped>

.messages-wrapper {
    width: 100%;
    padding-top: 4px;
    padding-bottom: 4px;
    overflow-y: scroll;
    flex-grow: 1;
}
.messages-wrapper::-webkit-scrollbar {
    width: 2px;
    -webkit-appearance: none;
}
.messages-wrapper::-webkit-scrollbar-track {
    background: none;        /* цвет зоны отслеживания */
    background-clip: content-box;
}
.messages-wrapper::-webkit-scrollbar-thumb {
    background-color: var(--gray5);
}
.message-wrapper {
    width: 70%;
    font-size: 12px;
    padding: 4px;
    border-radius: 8px;
    margin-bottom: 4px;
}
.message-text {
    width: 100%;
}
.message-time {
    width: 100%;
    text-align: right;
    font-size: 8px;
}
.message-sent {
    margin-left: auto;
    background: linear-gradient(97.99deg, var(--main) -11.81%, var(--main2) 130.29%);
}
.message-received {
    background-color: var(--bg3);
    margin-right: auto;
}
</style>