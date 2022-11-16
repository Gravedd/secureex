<template>
dsasadsa
</template>
<script>

import MenuIcon from "@/components/icons/menuIcon";
import icon from "@/components/icons/icon";
import PointsIcon from "@/components/icons/pointsIcon";
import AppHeader from "@/components/app-header";

export default {
	name: 'HomeView',
	components: {AppHeader, PointsIcon, icon, MenuIcon}
}

</script>

<style>
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
