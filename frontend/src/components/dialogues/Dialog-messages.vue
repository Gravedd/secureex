<template>
    <div class="basePadding messages-wrapper" id="messageBlock" @scroll="blockScrolled">

        <div
            v-for="message in messages['dialogWithUser1']"
            class="message-wrapper"
            :class="{'message-sent' : message.type === 'sent', 'message-received' : message.type === 'received'}"
        >
            <div class="message-text">{{ message.text }}</div>
            <div class="message-time">{{ message.time }}</div>
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
            console.log("Новое сообщение")
            if (!this.checkBlockScrolledMax(document.getElementById("messageBlock"), false)) {
                this.scrollBlockDown();
            } else {
                this.showDownBtn = true;
            }
        },
        blockScrolled(e) {
            this.showDownBtn = this.checkBlockScrolledMax(e.target, true);
        },
        checkBlockScrolledMax(e) {

            if ( e.scrollTop - (e.scrollHeight - e.clientHeight) <= -25) {//Определить насколько промотан блок
                return true;
            } else {
                return false;
            }


        },

        async scrollBlockDown(behavior = "smooth") {
            function scrollBlock() {
                let messageBlock = document.getElementById("messageBlock");
                console.log(behavior)
                messageBlock.scrollTo({
                    top: messageBlock.scrollHeight,
                    behavior: behavior
                });
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
        setInterval(() => {
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
        }, 1000);
    },
    beforeUnmount() {
        this.unsubscribe();
        console.log(this.unsubscribe());
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
}
.message-received {
    background-color: var(--bg3);
    margin-right: auto;
}
.down-btn {
    position: fixed; right: 18px; bottom: 70px;
}
</style>