<template>

    <div class="appWrapper">

        <app-header></app-header>

        <div class="componentWrapper">


            <div class="profile-wrapper">
                <div class="profile_header">
                    <user-avatar class="profile_avatar" :username="user.name"/>
                    <div class="profile_name">{{ user.name ?? "..."}}</div>
                </div>

                <div class="profile_info_wrapper">
                    <div>Информация</div>
                    <div class="profile_info">
                        <div class="profile_info_item">
                            <div class="value">{{ user.email }}</div>
                            <div class="title">Почта</div>
                        </div>
                        <div class="profile_info_item">
                            <div class="value">{{ user.nickname ?? "@username"}}</div>
                            <div class="title">Имя пользователя</div>
                        </div>
                    </div>
                </div>

                <div class="profile_buttons">
                    <div class="btn">
                        <icon><message-icon/></icon>
                        <span>Написать сообщение</span>
                    </div>
                </div>

            </div>

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
import Icon from "@/components/icons/icon";
import MessageIcon from "@/components/icons/messageIcon";
import AppHeader from "@/components/headers/app-header";
import config from "@/config";
import UserAvatar from "@/components/users/user-avatar";

export default {
	name: 'UserProfile',
	components: {UserAvatar, AppHeader, MessageIcon, Icon, ActionMenu},
    props: ["id"],
    data() {
	    return {
	        user: []
        }
    },
    async mounted() {
	    this.$showLoader();

        let response = await this.$request.get(config.api + "user/" + this.$route.params.id);

        this.$hideLoader();

        if (!response.ok) {
            return alert("Юзер не найден");
        }

        return this.user = await response.json();
    }
}

</script>

<style>
.profile-wrapper {
    width: 100%;
}
.profile_header {
    background-color: var(--main);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2px;
}
.profile_header .profile_avatar {
    width: 120px;
    height: 120px;
    background-color: var(--gray4);
    border-radius: 100px;
}
.profile_header .profile_name {
    line-height: 40px;
}

.profile_info_wrapper {
    font-size: 12px;
    background-color: var(--bg2);
    min-height: 100px;
    padding: 8px 16px;
}
.profile_info {
    margin-top: 8px;
}
.profile_info_item {
    padding: 2px 0;
}
.profile_info_item .value {
    font-size: 14px;
}
.profile_info_item .title {
    color: var(--bg4);
}

.profile_buttons {
    width: 100%;
    padding: 16px;
}
.profile_buttons .btn {
    display: flex;
    height: 40px;
    background-color: var(--main2);
    border-radius: 10px;
    justify-content: center;
    align-items: center;
}
.btn span {
    margin-left: 4px;
}

</style>
