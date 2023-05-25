<template>
    <header v-if="showHeader">

        <icon class="menuIcon" v-if="showSidebarBtn" @click="this.$store.commit('showSidebar')">
            <menu-icon/>
        </icon>

        <router-link :to="backBtnUrl" class="backBtn" v-if="showBackBtn">
            <icon viewBox="65 55 400 400">
                <back-icon/>
            </icon>
        </router-link>

        <router-link :to="{ name: 'user.profile', params: {id: user_id} }" id="headerTitle" v-if="!inputInsteadOfText" @click="$emit('clickOnHeaderTitle')">
            <user-avatar :avatar-src="avatarSrc" :username="username" class="avatar"/>
            <div class="user-info">
                <div class="username">{{ username }}</div>
                <div class="user-status typed-text" v-if="isUserTyping">Печатает...</div>
                <div class="user-status" v-if="!isUserTyping">{{ userOnlineData }}</div>
            </div>
        </router-link>

        <div class="headerInput" v-if="inputInsteadOfText" @click="$emit('clickOnHeaderInput')">
            <input type="text" autofocus placeholder="Поиск..." @input="updateInput">
        </div>

        <div class="right">
            <icon width="21" height="21" class="search-icon" v-if="showSearchIcon" @click="$emit('clickOnHeaderSearch')">
                <search-icon/>
            </icon>
            <icon class="pointsIcon" v-if="showActionMenu" @click="openMenu">
                <points-icon/>
            </icon>
        </div>
    </header>
</template>
<script>

import Icon from "@/components/icons/icon";
import MenuIcon from "@/components/icons/menuIcon";
import PointsIcon from "@/components/icons/pointsIcon";
import ActionMenu from "@/components/action-menu";
import store from "@/store";
import BackIcon from "@/components/icons/backIcon";
import SearchIcon from "@/components/icons/searchIcon";
import headerMixin from "@/mixins/headerMixin";
import UserAvatar from "@/components/users/user-avatar";

export default {
	name: "chat-header",
	components: {UserAvatar, SearchIcon, BackIcon, ActionMenu, PointsIcon, MenuIcon, Icon},
    mixins: [headerMixin],
    emits: ["clickOnHeaderTitle", "clickOnHeaderInput", "clickOnHeaderSearch"],
    props: {
        avatarSrc: {
            default: null,
            type: String,
        },
        username: {
            default: null,
            type: String,
        },
        user_id: {
            default: null,
            type: String,
        },
        isUserTyping: {
            default: false,
            type: Boolean,
        },
        userOnlineData: {
            default: "Онлайн",
            type: String,
        }
    }
}
</script>

<style scoped>
    @import "@/assets/styles/header.css";
    #headerTitle {
        display: flex;
        align-items: center;
    }
    #headerTitle .avatar {
        min-width: 30px;
        min-height: 30px;
        font-size: 16px;
        margin-right: 8px;
    }
    .user-info {
        display: flex;
        flex-direction: column;
        height: 30px;
    }
    .user-info .username {
        font-size: 14px;
    }
    .user-info .user-status {
        font-size: 10px;
    }
    .typed-text {
        animation: typing 1.5s infinite ease-in-out;
        opacity: 1;
    }

    @keyframes typing {
        0% { opacity: 1; }
        50% { opacity: 0.2; }
        to { opacity: 1; }
    }
</style>