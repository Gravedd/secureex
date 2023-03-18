<template>
    <header v-if="showHeader">
        <icon v-if="showSidebarBtn" class="menuIcon" @click="$emit('openSidebar')">
            <menu-icon/>
        </icon>
        <router-link v-if="showBackBtn" :to="backBtnUrl" class="backBtn">
            <icon viewBox="65 55 400 400">
                <back-icon/>
            </icon>
        </router-link>
        <div id="headerTitle" v-if="!inputInsteadOfText">
            {{ headerTitle }}
        </div>
        <div class="headerInput" v-if="inputInsteadOfText">
            <input type="text" autofocus placeholder="Поиск..." @input="updateInput">
        </div>
        <div class="right">
            <icon width="21" height="21" class="search-icon" v-if="showSearchIcon">
                <search-icon/>
            </icon>
            <icon class="pointsIcon" @click="openMenu">
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

export default {
	name: "app-header",
	components: {SearchIcon, BackIcon, ActionMenu, PointsIcon, MenuIcon, Icon},

    computed: {
        showSidebarBtn() {
            return this.$store.getters.showSidebarBtn;
        },
        showBackBtn() {
            return this.$store.getters.showBackBtn;
        },
        backBtnUrl() {
            return this.$store.getters.backBtnUrl;
        },
        headerTitle() {
            return store.getters.headerTitle;
        },
        showActionMenu() {
            return this.$store.getters.showActionMenu;
        },
        showHeader() {
            return this.$store.getters.showHeader;
        },
        inputInsteadOfText() {
            return this.$store.getters.inputInsteadOfText;
        },
        showSearchIcon() {
            return this.$store.getters.showSearchIcon;
        }
    },

    methods: {
        openMenu () {
            this.$store.commit("actionMenuStatus", true);
        },
        updateInput(e) {
            this.$store.commit("headerInputValue", e.target.value);
        }
    },
    emits: {
        openSidebar: null,
    }
}
</script>

<style scoped>
    header {
        height: 40px;
        display: flex;
        align-items: center;
        background-color: var(--main);
        padding: 0 16px;
    }
    #headerTitle {
        height: 19px;
    }
    .menuIcon {
        margin-right: 19px;
    }
    .pointsIcon {
        margin-left: auto;
    }
    .backBtn {
        margin-right: 19px;
        height: 19px;
    }
    .headerInput {
        width: 100%;
        padding-right: 19px;
    }
    .headerInput input {
        width: 100%;
        height: 30px;
        border: none;
        background-color: var(--main);
        color: var(--text);
    }
    .headerInput input:focus {
        outline: none;
    }
    .search-icon {
        margin-right: 19px;
    }
    .right {
        margin-left: auto;
    }
</style>