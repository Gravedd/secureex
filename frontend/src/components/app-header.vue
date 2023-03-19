<template>
    <header v-if="showHeader">
        <icon v-if="showSidebarBtn" class="menuIcon" @click="this.$store.commit('showSidebar')">
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
import headerMixin from "@/mixins/headerMixin";

export default {
	name: "app-header",
	components: {SearchIcon, BackIcon, ActionMenu, PointsIcon, MenuIcon, Icon},
    methods: {

    },
    mixins: [headerMixin]
}
</script>

<style scoped>
    @import "@/assets/styles/header.css";
</style>