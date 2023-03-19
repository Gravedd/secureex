<template>
    <div class="appWrapper">
        <basic-header>Страница</basic-header>

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
import BasicHeader from "@/components/headers/basic-header";

export default {
	name: 'CleanTemplate',
	components: {BasicHeader, ActionMenu}
}

</script>

<style>

</style>
