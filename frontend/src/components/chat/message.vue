<template>
    <div class="message-wrapper"
         :class="{'message-sent' : message.user_id === this.$store.getters.user_id, 'message-received' : message.user_id !== this.$store.getters.user_id}"
    >

        <message-attach v-if="message.type !== 'msg'" :message_type="message.type" :attach_data="message.attach_data"/>
        <div v-if="message.upload" class="message_load_file">
            Загрузка файла
        </div>
        <div class="message-text">{{ message.body }}</div>
        <div class="message-time-wrapper" :title="message.id">
            <div class="message-time">{{ message.created_at }}</div>
            <div class="message-read">
                <span v-if="message.uid === undefined">✓</span>
                <span v-if="message.read === 1">✓</span>
            </div>
        </div>
    </div>
</template>
<script>
import MessageAttach from "@/components/chat/message-attach";

export default {
    name : "message",
    props: ["message"],
    components: {MessageAttach},
}
</script>
<style scoped>
.message-wrapper {
    font-size: 12px;
    padding: 4px 8px 4px 8px;
    border-radius: 8px;
    margin-bottom: 4px;
    transition: 0.25s;
}

.message-wrapper:hover {
    transform: scale(1.01);
}

.message-text {
    width: 100%;
    word-break: break-word;
}

.message-time-wrapper {
    width: 100%;
    text-align: right;
    font-size: 8px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.message-time {
    margin-right: 4px;
    opacity: 0.8;
    user-select: none;
    margin-left: 50px;
}

.message-read {
    font-size: 12px;
    letter-spacing: -4.5px;
    padding-right: 4px;
    opacity: 0.6;
    font-weight: bold;
    user-select: none;
}

.message-sent {
    margin-left: auto;
    background: linear-gradient(97.99deg, var(--main) -11.81%, var(--main2) 130.29%);
    animation: 0.3s show-sent ease-in-out;
    max-width: 60%;
}

.message-received {
    background-color: var(--bg3);
    margin-right: auto;
    animation: 0.3s show-received ease-in-out;
    max-width: 60%;
}

@media (max-width: 400px) {
    .message-read {
        font-size: 10px;
        opacity: 0.75;
        letter-spacing: -5px;
        font-weight: normal;
    }

    .message-time {
        opacity: 0.75;
    }
}

.message_load_file {
    animation: loading 1s infinite;
    width: 100%;
}

@keyframes loading {
    from { opacity: 1 }
    to { opacity: 0.3 }
}
</style>