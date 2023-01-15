<template>
    <div class="componentWrapper">


        <div class="profile-wrapper">
            <div class="profile_header">
                <div class="profile_avatar"></div>
                <div class="profile_name">Username</div>
            </div>

            <div class="profile_info_wrapper">
                <div>Информация</div>
                <div class="profile_info">
                    <div class="profile_info_item">
                        <div class="value">example@gmail.com</div>
                        <div class="title">Почта</div>
                    </div>
                    <div class="profile_info_item">
                        <div class="value">@username</div>
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
</template>
<script>

import ActionMenu from "@/components/action-menu";
import Icon from "@/components/icons/icon";
import MessageIcon from "@/components/icons/messageIcon";

export default {
	name: 'CleanTemplate',
	components: {MessageIcon, Icon, ActionMenu}
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
