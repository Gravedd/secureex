<template>
    <div class="user-list-wrapper">
        <user-item v-for="user in users" :id="user.id" :name="user.name" :avatar="user.avatar" :text="user.nickname"/>
    </div>
</template>

<script>
import UserItem from "@/components/users/user-item";

export default {
    name      : "user-list",
    components: {UserItem},
    props     : {
        users: {
            default: [],
            type   : Array,
        },
    }
}
</script>

<style scoped>
.user-list-wrapper {
    width: 100%;
}
</style>