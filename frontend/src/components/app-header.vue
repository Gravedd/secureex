<template>
    <header>
        <icon class="menuIcon" @click="$emit('openSidebar')">
            <menu-icon/>
        </icon>
        <div id="headerTitle">
            <slot></slot>
        </div>
        <icon class="pointsIcon">
            <points-icon/>
        </icon>
    </header>
</template>
<script>

import Icon from "@/components/icons/icon";
import MenuIcon from "@/components/icons/menuIcon";
import PointsIcon from "@/components/icons/pointsIcon";
export default {
	name: "app-header",
	components: {PointsIcon, MenuIcon, Icon},
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
</style>