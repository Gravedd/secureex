<template>
    <div class="componentWrapper">


        <div class="chat-wrapper"
             :style="{
                    'height': `${clientHeight - 40}px`
             }"
        >
            <div class="basePadding messages-wrapper">
                <div class="message-wrapper message-sent">
                    <div class="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                    <div class="message-time">14:15</div>
                </div>
                <div class="message-wrapper message-received">
                    <div class="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                    <div class="message-time">14:15</div>
                </div>
                <div class="message-wrapper message-sent">
                    <div class="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                    <div class="message-time">14:15</div>
                </div>
                <div class="message-wrapper message-received">
                    <div class="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                    <div class="message-time">14:15</div>
                </div>
                <div class="message-wrapper message-received">
                    <div class="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                    <div class="message-time">14:15</div>
                </div>
                <div class="message-wrapper message-sent">
                    <div class="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                    <div class="message-time">14:15</div>
                </div>
                <div class="message-wrapper message-sent">
                    <div class="message-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                    <div class="message-time">14:15</div>
                </div>
            </div>
            <div class="messSent-wrapper basePadding"
                :style="{
                    'height': `${inputBlockHeight}px`
                }"
            >
                <icon class="attach-btn">
                    <attach-icon/>
                </icon>
                <textarea
                    id="message-input"
                    class="nice-scrollbar"
                    placeholder="Сообщение"
                    @input="messageInput"
                    v-model="inputText"
                    :style="{
                        'height': `${inputHeight}px`
                    }"
                ></textarea>
                <icon class="sent-btn">
                    <send-icon/>
                </icon>
            </div>
        </div>

        <action-menu>
            <div>
                <router-link to="/">To chats</router-link>
            </div>
            <div>Кнопка 2</div>
        </action-menu>
    </div>
</template>
<script>

import ActionMenu from "@/components/action-menu";
import Icon from "@/components/icons/icon";
import BackIcon from "@/components/icons/backIcon";
import MenuIcon from "@/components/icons/menuIcon";
import AttachIcon from "@/components/icons/attachIcon";
import SendIcon from "@/components/icons/sendIcon";
import store from "@/store"

export default {
	name: 'ChatView',
	components: {SendIcon, AttachIcon, MenuIcon, BackIcon, Icon, ActionMenu},
    data() {
	    return {
	        inputHeight: 19,//base - 19px
            inputText: "",
            maxInputHeight: 120,
            inputBlockHeight: 40,
        }
    },
    computed: {
        clientWidth() {
            return this.$store.getters.clientWidth;
        },
        clientHeight() {
            return this.$store.getters.clientHeight;
        },
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
    beforeCreate() {
	    this.$store.commit("setHeaderSetting", {
            showSidebarBtn: false,
            showBackBtn: true,
            backBtnUrl: "/",
            headerTitle: "UserName",
            showActionMenu: true,
        });
    }
}

</script>

<style>
    .chat-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        height: 528px;
    }
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
