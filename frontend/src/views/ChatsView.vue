<template>
    <action-menu>
        <div>
            <router-link to="/clean">To clean</router-link>
        </div>
    </action-menu>
    чаты
</template>

<script>
import ActionMenu from "@/components/action-menu";
export default {
    name: "ChatsView",
    components: {ActionMenu}
}
</script>

<style scoped>
</style>