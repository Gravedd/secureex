<template>
    <div class="componentWrapper">


        <action-menu>
            <div>
                <router-link to="/">To chats</router-link>
            </div>
            <div>Кнопка 2</div>
        </action-menu>
    </div>
</template>
<script>

import ActionMenu from "@/components/action-menu";

export default {
	name: 'CleanTemplate',
	components: {ActionMenu}
}

</script>

<style>

</style>
