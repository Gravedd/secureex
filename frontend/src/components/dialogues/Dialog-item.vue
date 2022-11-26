<template>
    <router-link to="/chat" class="dialog-wrapper basePadding">
        <div class="dialog-avatar-wrapper">
            <div class="dialog-avatar"></div>
        </div>
        <div class="dialog-data">
            <div class="dialog-name-time-wrapper">
                <div class="dialog-name">{{ username }}</div>
                <div class="dialog-time">{{ lastTime }}</div>
            </div>
            <div class="dialog-message">{{ lastMessage }}</div>
        </div>
    </router-link>
</template>
<script>
export default {
    name: "dialog-item",
    props: {
        user_id: null,
        username: null,
        lastMessage: null,
        lastTime: null,
    }
}
</script>
<style scoped>
    .dialog-wrapper {
        height: 46px;
        width: 100%;
        display: flex;
        margin-bottom: 4px;
        border-bottom: 1px solid var(--bg2);
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