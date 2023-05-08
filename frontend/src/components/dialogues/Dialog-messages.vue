<template>
    <div class="basePadding messages-wrapper" id="messageBlock" @scroll="blockScrolled">

        <div
            v-for="message in messages['dialogWithUser' + with_user]"
            class="message-wrapper"
            :class="{'message-sent' : message.user_id === this.$store.getters.user_id, 'message-received' : message.user_id !== this.$store.getters.user_id}"
        >
            <div class="message-text">{{ message.body }}</div>
            <div class="message-time">{{ message.created_at }}</div>
        </div>
    </div>
    <icon viewBox="0 0 30 30" class="down-btn" width="25" height="25" v-if="showDownBtn" @click="scrollBlockDown()"><down-icon/></icon>
</template>
<script>
import store from "@/store";
import Icon from "@/components/icons/icon";
import DownIcon from "@/components/icons/downIcon";

export default {
    name: "Dialog-messages",
    components: {DownIcon, Icon},
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
        },
        blockScrolled(e) {
            this.showDownBtn = this.checkBlockScrolledMax(e.target, true);
        },
        checkBlockScrolledMax(e) {
            return e.scrollTop - (e.scrollHeight - e.clientHeight) <= -25;
        },

        async scrollBlockDown(behavior = "smooth") {
            function scrollBlock() {
                const messageBlock = document.getElementById("messageBlock");
                const scrollOptions = {
                    top: messageBlock.scrollHeight,
                    behavior: "smooth"
                };
                messageBlock.scrollTo(scrollOptions);
            }
            setTimeout(scrollBlock, 25);
        }
    },
    mounted() {
        //Подписка на изменение диалога
        this.unsubscribe = store.subscribe((mutation) => {
            if (mutation.type === "addMessage" && mutation.payload.user_id == 1) {
                this.newMessageEvent(mutation.payload);
            }
        });
        //Перемотать блок до конца
        this.scrollBlockDown("instant");

        //Генератор сообщений(временно)
        /*setInterval(() => {
            let random = Math.floor(Math.random() * 2);
            let random2 = Math.floor(Math.random() * 1000);
            let random3 = Math.floor(Math.random() * 59);
            this.$store.commit("addMessage", {
                user_id: 1,
                id: 1,
                text: "text" + random2,
                time: "14:"+random3,
                type: random >= 1 ? "sent" : "received"
            });
        }, 4000);*/
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