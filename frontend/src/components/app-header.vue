<template>
    <header>
        <icon v-if="showSidebarBtn" class="menuIcon" @click="$emit('openSidebar')">
            <menu-icon/>
        </icon>
        <router-link v-if="showBackBtn" :to="backBtnUrl" class="backBtn">
            <icon viewBox="65 55 400 400">
                <back-icon/>
            </icon>
        </router-link>
        <div id="headerTitle">
            {{ headerTitle }}
        </div>
        <icon class="pointsIcon" @click="openMenu">
            <points-icon/>
        </icon>
    </header>
</template>
<script>

import Icon from "@/components/icons/icon";
import MenuIcon from "@/components/icons/menuIcon";
import PointsIcon from "@/components/icons/pointsIcon";
import ActionMenu from "@/components/action-menu";
import store from "@/store";
import BackIcon from "@/components/icons/backIcon";

export default {
	name: "app-header",
	components: {BackIcon, ActionMenu, PointsIcon, MenuIcon, Icon},

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
    },

    methods: {
        openMenu () {
            this.$store.commit("actionMenuStatus", true);
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
</style>