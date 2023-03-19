<template>

    <div class="appWrapper">

        <app-header>Настройки</app-header>

        <div class="componentWrapper">

            <div class="settingsContainer">
                <div class="profileInfoWrapper flex col-1-1">
                <!--TODO: сделать фон блюром аватарки-->
                    <div class="profileInfoAvatar">
                        <div class="avatar"></div>
                    </div>
                    <div class="profileInfo">
                        <div class="username">{{ $store.getters.user_name }}</div>
                        <div class="nickname">@username</div>
                    </div>
                </div>

                <div class="settingsWrapper">
                    <div class="settingHeader">Основная информация</div>
                    <div class="inputSetting">
                        <input type="text" placeholder="Ваше имя">
                    </div>
                    <div class="inputSetting">
                        <input type="text" placeholder="Никнейм профиля">
                    </div>
                    <div class="inputSetting">
                        <input type="text" placeholder="О себе">
                    </div>
                </div>
                <div class="savebtnwrap">
                    <div class="savebutton">Сохранить</div>
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
import AppSidebar from "@/components/app-sidebar";
import AppHeader from "@/components/headers/app-header";

export default {
	name: 'CleanTemplate',
	components: {AppSidebar, ActionMenu, AppHeader}
}

</script>

<style>
.settingsContainer {

}
.profileInfoWrapper {
    background-color: var(--bg4);
    height: 89px;
    margin-bottom: 5px;
}
.profileInfoAvatar {
    width: 30%;
}
.profileInfo {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.profileInfo .username {
    font-size: 16px;
}
.profileInfo .nickname {
    font-size: 12px;
}
.avatar {
    width: 57px;
    height: 57px;
    background-color: var(--gray1);
    border-radius: 100px;
}
.settingsWrapper {
    width: 100%;
    background-color: var(--bg2);
    padding: 8px 16px 16px 16px;
}
.inputSetting {
    width: 100%;
    margin-top: 12px;
}
.inputSetting input {
    width: 100%;
    height: 23px;
    background: none;
    border: none;
    border-bottom: 1px solid var(--bg4);
    color: var(--text);
}
.inputSetting input:focus {
    outline: none;
}
.inputSetting input::placeholder {
    color: var(--bg4);
}
.savebtnwrap {
    width: 100%;
    padding: 16px 16px;
    text-align: center;
}
.savebutton {
    width: 100%;
    background-color: var(--main2);
    line-height: 40px;
    border-radius: 10px;
}
@media (min-width: 400px) {
    .profileInfoAvatar {
        width: auto;
        margin-right: 19px;
    }
}
</style>
