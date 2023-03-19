<template>
    <header v-if="showHeader">
        <div id="headerTitle">
            <slot></slot>
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
	name: "clean-header",
	components: {SearchIcon, BackIcon, ActionMenu, PointsIcon, MenuIcon, Icon},
    methods: {

    },
    mixins: [headerMixin]
}
</script>

<style scoped>
    @import "@/assets/styles/header.css";
</style>