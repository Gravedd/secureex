<template>
    <div class="sidebarContainer">
        <div class="sidebarWrapper">
            <div class="sidebarHeader">
                <div class="avatar-wrapper">
                    <div class="avatar"></div>
                </div>
                <div class="userdata">
                    <div class="userdata-name">Username</div>
                    <div class="userdata-nickname">@username</div>
                </div>
            </div>
            <div class="sidebarMenu">
                <div class="item">
                    <icon color="#5C04BB"><settings-icon/></icon>
                    <span class="item-text">Настройки</span>
                </div>
                <div class="item">
                    <icon color="#5C04BB"><key-icon/></icon>
                    <span class="item-text">Ключи</span>
                </div>
                <div class="item">
                    <icon color="#5C04BB"><people-icon/></icon>
                    <span class="item-text">Пригласить друзей</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SettingsIcon from "@/components/icons/settingsIcon";
import Icon from "@/components/icons/icon";
import KeyIcon from "@/components/icons/keyIcon";
import PeopleIcon from "@/components/icons/peopleIcon";
export default {
	name: "app-sidebar",
	components: {PeopleIcon, KeyIcon, Icon, SettingsIcon}
}
</script>
<style scoped>
    .sidebarContainer {
        position: fixed;
        backdrop-filter: brightness(0.7);
        top: 0;
        width: 100%;
        height: 100%;

    }
    .sidebarWrapper {
        background-color: var(--bg2);
        width: 77%;
        height: 100%;
    }
    .sidebarHeader {
        background-color: var(--gray5);
        height: 150px;
        padding: 0 16px;
    }
    .avatar-wrapper {
        padding-top: 33px;
    }
    .avatar {
        width: 57px;
        height: 57px;
        background-color: var(--gray4);
        border-radius: 100px;
    }
    .userdata {
        padding-top: 16px;
    }
    .userdata-name {

    }
    .userdata-nickname {

    }

    .sidebarMenu {
        padding: 20px 16px;
    }
    .sidebarMenu .item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
    .item-text {
        margin-left: 15px;
    }

</style>