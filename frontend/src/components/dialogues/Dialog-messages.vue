<template>
    <div class="basePadding messages-wrapper" id="messageBlock" @scroll="blockScrolled">
        <message
            v-for="message in messages['dialogWithUser' + with_user]"
            :message="message"
        />
    </div>
    <icon viewBox="0 0 30 30" class="down-btn" width="25" height="25" v-if="showDownBtn" @click="scrollBlockDown()"><down-icon/></icon>
</template>
<script>
import store from "@/store";
import Icon from "@/components/icons/icon";
import DownIcon from "@/components/icons/downIcon";
import Message from "@/components/dialogues/message";

export default {
    name: "Dialog-messages",
    components: {Message, DownIcon, Icon},
    props: ["with_user"],
    data() {
        return {
            showDownBtn: false,
            unsubscribe: null,
        }
    },
    computed: {
        messages() {
            return store.getters.getDialogById;
        },
    },
    methods: {
        newMessageEvent(message) {
            const messageBlock = document.getElementById("messageBlock");
            if (!this.checkBlockScrolledMax(messageBlock, false)) {
                this.scrollBlockDown();
            } else {
                this.showDownBtn = true;
            }
            let sender_id = message.message ? message.message.user_id : message.user_id;
            if (sender_id != store.getters.user_id) {
                store.dispatch("markAllMessagesMarked", {
                    "dialogWith": this.with_user,
                });
            }
        },
        blockScrolled(e) {
            this.showDownBtn = this.checkBlockScrolledMax(e.target, true);
        },
        checkBlockScrolledMax(e) {
            return e.scrollTop - (e.scrollHeight - e.clientHeight) <= -55;
        },

        async scrollBlockDown(behavior = "smooth") {
            function scrollBlock() {
                const messageBlock = document.getElementById("messageBlock");
                const scrollOptions = {
                    top: messageBlock.scrollHeight,
                    behavior: behavior
                };
                messageBlock.scrollTo(scrollOptions);
            }
            setTimeout(scrollBlock, 25);
        }
    },
    mounted() {
        //Подписка на изменение диалога
        this.unsubscribe = store.subscribe((mutation) => {
            if (mutation.type === "addMessage" || mutation.type === "newMessage") {
                this.newMessageEvent(mutation.payload);
            }
        });
        //Перемотать блок до конца
        this.scrollBlockDown("instant");
    },
    beforeUnmount() {
        this.unsubscribe();
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

.down-btn {
    position: fixed; right: 18px; bottom: 70px;
}
@keyframes show-sent {
    from { opacity: 0; transform: translateX(100px) scale(0) ; }
    to { opacity: 1; transform: translateX(0) scale(1);}
}
@keyframes show-received {
    from { opacity: 0; transform: translateX(-100px) scale(0) ; }
    to { opacity: 1; transform: translateX(0) scale(1);}
}
@media (min-width: 1000px) {
    .messages-wrapper {
        border-left: 1px solid var(--bg2);
        border-right: 1px solid var(--bg2);
    }
    .down-btn {
        position: fixed; right: 120px; bottom: 70px;
    }
}
@media (min-width: 1500px) {
    .down-btn {
        position: fixed; right: 420px; bottom: 70px;
    }
}
</style>