<template>
    <div class="message-wrapper" :class="{'message-sent' : message.user_id === this.$store.getters.user_id, 'message-received' : message.user_id !== this.$store.getters.user_id}">
        <div class="message-text">{{ message.body }}</div>
        <div class="message-time">{{ message.created_at }}</div>
    </div>
</template>
<script>
export default {
    name: "message",
    props: ["message"],
}
</script>
<style scoped>
.message-wrapper {
    width: 70%;
    font-size: 12px;
    padding: 4px;
    border-radius: 8px;
    margin-bottom: 4px;
    transition: 0.25s;
}
.message-wrapper:hover {
    transform: scale(1.01);
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
    animation: 0.3s show-sent ease-in-out;
}
.message-received {
    background-color: var(--bg3);
    margin-right: auto;
    animation: 0.3s show-received ease-in-out;
}
</style>