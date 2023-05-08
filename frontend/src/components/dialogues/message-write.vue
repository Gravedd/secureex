<template>
    <div class="messSent-wrapper basePadding" :style="{'height': `${inputBlockHeight}px`}">
        <icon class="attach-btn">
            <attach-icon/>
        </icon>

        <textarea
            id="message-input"
            class="nice-scrollbar"
            placeholder="Сообщение"
            @input="messageInput"
            v-model="inputText"
            :style="{'height': `${inputHeight}px`}"
        ></textarea>

        <icon class="sent-btn" @click="sendMessage">
            <send-icon/>
        </icon>
    </div>
</template>
<script>

import SendIcon from "@/components/icons/sendIcon";
import AttachIcon from "@/components/icons/attachIcon";
import Icon from "@/components/icons/icon";
import Uuid from "@/utils/uuid";

export default {
    name: "message-write",
    components: {SendIcon, AttachIcon, Icon},
    props: ["with_user"],
    data() {
        return {
            inputHeight: 19,//base - 19px
            inputText: "",
            maxInputHeight: 120,
            inputBlockHeight: 40,
        }
    },
    methods: {
        messageInput(e) {
            this.changeInputSize()
        },
        changeInputSize() {
            let oldHeight = this.inputHeight;
            let height = 19 * (((this.inputText.match(/\n/g) || {}).length || 0) + 1);
            this.inputHeight = `${Math.min(height, this.maxInputHeight)}`;
            if (this.inputHeight != oldHeight) {
                this.inputBlockHeight = parseInt(this.inputHeight) + 21;
            }
        },
        sendMessage() {
            let uuid = Uuid.generateUUID();
            this.$store.commit("addMessage", {
                "user_id": this.with_user,
                "message": {
                    "id": null,
                    "body": this.inputText,
                    "user_id": this.$store.getters.user_id,
                    "created_at": Date.now(),
                    "updated_at": Date.now(),
                    "read": 0,
                    "uuid": uuid,
                }
            });

            this.$store.getters.ws.send(JSON.stringify({
                "action": "message",
                "data": {
                    "text": this.inputText,
                    "to_user": this.with_user,
                    "uuid" : uuid,
                }
            }));
            this.inputText = "";
        }

    },
}
</script>
<style scoped>
.messSent-wrapper {
    height: 40px;
    width: 100%;
    background-color: var(--bg2);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 10px;
}
.attach-btn {
    margin-right: 19px;
    line-height: 19px;
}
#message-input {
    width: 100%;
    margin-right: 19px;
    resize: none;
    background: transparent;
    border: none;
    font-size: 14px;
    color: var(--text);
    line-height: 19px;
    height: 19px;
}
#message-input:focus {
    outline: none;
}
.sent-btn {

}
</style>