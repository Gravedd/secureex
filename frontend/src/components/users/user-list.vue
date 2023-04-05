<template>
    <div class="user-list-wrapper">
        <user-item v-for="user in users" :name="user.name" :avatar="{}" :text="user.last_online"/>
    </div>
</template>

<script>
import UserItem from "@/components/users/user-item";
export default {
    name: "user-list",
    components: {UserItem},
    props: {
        users: {
            default: [],
            type: Array,
        },
    }
}
</script>

<style scoped>
.user-list-wrapper {
    width: 100%;
}
</style>