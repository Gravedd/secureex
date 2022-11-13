<template>
    <header>
        <icon class="menuIcon">
            <menu-icon/>
        </icon>
        <div>
            Название страницы
        </div>
        <icon class="pointsIcon">
            <points-icon/>
        </icon>
    </header>
</template>
<script>
// @ is an alias to /src
/*import HelloWorld from '@/components/HelloWorld.vue'*/

import MenuIcon from "@/components/icons/menuIcon";
import icon from "@/components/icons/icon";
import PointsIcon from "@/components/icons/pointsIcon";
export default {
	name: 'HomeView',
	components: {PointsIcon, icon, MenuIcon}
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
    .menuIcon {
        margin-right: 19px;
    }
    .pointsIcon {
        margin-left: auto;
    }
</style>
