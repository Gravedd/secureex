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

        <div id="headerTitle" v-if="!inputInsteadOfText" @click="$emit('clickOnHeaderTitle')">
            <slot></slot>
        </div>

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
import ActionMenu from "@/components/ui/action-menu";
import store from "@/store";
import BackIcon from "@/components/icons/backIcon";
import SearchIcon from "@/components/icons/searchIcon";
import headerMixin from "@/mixins/headerMixin";

export default {
	name: "app-header",
	components: {SearchIcon, BackIcon, ActionMenu, PointsIcon, MenuIcon, Icon},
    mixins: [headerMixin],
    emits: ["clickOnHeaderTitle", "clickOnHeaderInput", "clickOnHeaderSearch"]
}
</script>

<style scoped>
    @import "@/assets/styles/header.css";
</style>