<template>
    <router-link :to="{ name: 'chat', params: {id: user_id} }" class="dialog-wrapper basePadding">
        <div class="dialog-avatar-wrapper">
            <user-avatar :avatar-src="user_avatar" :username="username"/>
        </div>
        <div class="dialog-data">
            <div class="dialog-name-time-wrapper">
                <div class="dialog-name">{{ username }}</div>
                <div class="dialog-time">{{ lastTime }}</div>
            </div>
            <div class="dialog-name-time-wrapper">
                <div class="dialog-message">{{ lastMessage }}</div>

                <div class="dialog-unread-wrapper">
                    <div class="dialog-unread-count" v-if="unread_count && unread_count > 0">{{ unread_count }}</div>
                </div>
            </div>
        </div>
    </router-link>
    <hr>
</template>
<script>
import UserAvatar from "@/components/users/user-avatar";
export default {
    name: "dialog-item",
    components: {UserAvatar},
    props: {
        user_id: null,
        user_avatar: null,
        username: null,
        lastMessage: null,
        lastTime: null,
        unread_count: null,
    }
}
</script>
<style scoped>
    .dialog-wrapper {
        height: 46px;
        width: 100%;
        display: flex;
        margin-bottom: 4px;
    }
    hr {
        border: 1px solid var(--bg2);
    }
    .dialog-avatar-wrapper {
        width: 39px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 18px;
    }
    .dialog-avatar {
        min-height: 39px;
        min-width: 39px;
        background-color: var(--gray4);
        border-radius: 20px;
    }
    .dialog-data {
        width: 100%;
    }
    .dialog-name-time-wrapper {
        display: flex;
        height: 23px;
        line-height: 23px;
        justify-content: space-between;
    }
    .dialog-name {

    }
    .dialog-time {
        font-size: 8px;
    }
    .dialog-message {
        font-size: 10px;
        height: 23px;
        line-height: 23px;
    }
    .dialog-unread-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .dialog-unread-count {
        background-color: var(--main2);
        border-radius: 100px;
        text-align: center;
        position: relative;
        height: 20px;
        line-height: 20px;
        top: -2px;
        padding: 0 6px;
        font-size: 10px;
    }

    @media (min-width: 650px) {
        .dialog-wrapper {
            height: 60px;
        }
        .dialog-name-time-wrapper, .dialog-message {
            line-height: 30px;
        }
        .dialog-message {
            font-size: 12px;
        }
        .dialog-time {
            font-size: 10px;
        }
        .dialog-unread-count {
            height: 25px;
            line-height: 25px;
            top: 4px;
            padding: 0 9px;
            font-size: 12px;
        }
    }
    @media (min-width: 1200px) {
        .dialog-wrapper {
            height: 60px;
        }
        .dialog-name-time-wrapper, .dialog-message {
            line-height: 30px;
        }
        .dialog-message {
            font-size: 13px;
        }
        .dialog-time {
            font-size: 12px;
        }
    }
</style>