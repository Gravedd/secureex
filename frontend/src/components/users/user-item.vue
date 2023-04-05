<template>
    <router-link :to="{ name: 'user.profile', params: {id} }">
        <div class="user-list-item-wrapper">
            <div class="user-avatar-wrapper">
                <user-avatar :username="name" :avatar-src="avatar"/>
            </div>
            <div class="user-data-wrapper">
                <div class="user-name">{{ name }}</div>
                <div class="user-text">{{ text }}</div>
            </div>
        </div>
    </router-link>
</template>
<script>
import UserAvatar from "@/components/users/user-avatar";
export default {
    name: "user-item",
    components: {UserAvatar},
    props: ["id", "avatar", "name", "text"]
}
</script>
<style scoped>
.user-list-item-wrapper {
    display: flex;
    padding: 5px 16px;
    margin-bottom: 5px;
}
.user-avatar-wrapper {
    margin-right: 18px;
}
.user-data-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.user-text {
    font-size: 12px;
}
.avatar {
    width: 39px;
    height: 39px;
    background-color: var(--gray4);
    border-radius: 100px;
}
</style>