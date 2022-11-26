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

        <icon class="sent-btn">
            <send-icon/>
        </icon>
    </div>
</template>
<script>

import SendIcon from "@/components/icons/sendIcon";
import AttachIcon from "@/components/icons/attachIcon";
import Icon from "@/components/icons/icon";

export default {
    name: "message-write",
    components: {SendIcon, AttachIcon, Icon},
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
            this.changeInputSize(e)
        },
        changeInputSize(e) {
            let oldHeight = this.inputHeight;
            let height = 19 * (((this.inputText.match(/\n/g) || {}).length || 0) + 1);
            this.inputHeight = `${Math.min(height, this.maxInputHeight)}`;
            if (this.inputHeight != oldHeight) {
                this.inputBlockHeight = parseInt(this.inputHeight) + 21;
            }
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