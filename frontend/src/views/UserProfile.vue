<template>

    <div class="appWrapper">

        <app-header></app-header>

        <div class="componentWrapper">


            <div class="profile-wrapper">
                <div class="profile_header">
                    <user-avatar class="profile_avatar" :username="user.name" :avatar-src="user.avatar"/>
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
                    <router-link class="btn" :to="{ name: 'chat', params: {'id': this.$route.params.id} }">
                        <icon><message-icon/></icon>
                        <span>Написать сообщение</span>
                    </router-link>
                </div>

            </div>

            <action-menu>
                <div><router-link class="btn" :to="{ name: 'chat', params: {'id': this.$route.params.id} }">Перейти в диалог</router-link></div>
                <div @click="copyUserLink">Поделиться</div>
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
import Users from "@/requests/users";

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

        this.user = await Users.getUser(this.$route.params.id);

        this.$hideLoader();

        if (!this.user) {
            this.user = [];
            return alert("Юзер не найден");
        }
    },
    methods: {
        copyUserLink() {
            let inp = document.createElement('input')
            inp.value = window.location.href;
            document.body.appendChild(inp)
            inp.select();

            document.execCommand('copy');

            document.body.removeChild(inp);
            this.$store.commit("actionMenuStatus", false);
            this.$swal("Ссылка скопирована!");
        }
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
