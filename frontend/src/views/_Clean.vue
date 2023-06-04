<template>
    <div class="appWrapper">
        <app-header>Страница</app-header>
        <div class="componentWrapper">
            <action-menu>
                <div>
                    <router-link to="/">To chats</router-link>
                </div>
                <div>Кнопка 2</div>
            </action-menu>
        </div>
    </div>
</template>

<script>

import ActionMenu from "@/components/action-menu";
import AppHeader from "@/components/headers/app-header";

export default {
	name: 'CleanTemplate',
	components: {AppHeader, ActionMenu}
}

</script>

<style>

</style>
