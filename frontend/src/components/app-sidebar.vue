<template>
    <div class="background" v-if="showSidebar"></div>
    <transition name="slide">
        <div class="sidebarContainer" v-if="showSidebar" @click="closeSidebar">
            <div class="sidebarWrapper" @click="clickOnSidebar">
                <div class="sidebarHeader">
                    <div class="avatar-wrapper">
                        <user-avatar class="avatar" :username="$store.getters.user_name" />
                    </div>
                    <div class="userdata">
                        <div class="userdata-name">{{ $store.getters.user_name }}</div>
                        <div class="userdata-nickname">@username</div>
                    </div>
                </div>
                <div class="sidebarMenu">

                    <router-link to="/settings" class="item" @click="closeSidebar">
                        <icon color="#5C04BB">
                            <settings-icon/>
                        </icon>
                        <span class="item-text">Настройки</span>
                    </router-link>

                    <div class="item">
                        <icon color="#5C04BB">
                            <key-icon/>
                        </icon>
                        <span class="item-text">Ключи</span>
                    </div>
                    <div class="item">
                        <icon color="#5C04BB">
                            <people-icon/>
                        </icon>
                        <span class="item-text">Пригласить друзей</span>
                    </div>
                </div>
            </div>
        </div>
    </transition>

</template>

<script>
import SettingsIcon from "@/components/icons/settingsIcon";
import Icon from "@/components/icons/icon";
import KeyIcon from "@/components/icons/keyIcon";
import PeopleIcon from "@/components/icons/peopleIcon";
import UserAvatar from "@/components/users/user-avatar";

export default {
	name: "app-sidebar",
    computed: {
        showSidebar() {
            return this.$store.getters.showSidebar;
        },
    },
    methods: {
        clickOnSidebar(event) { event.stopPropagation(); },//Клик на сайдбар
        closeSidebar(event) {
            return this.$store.commit("closeSidebar");
        }

    },
	components: {UserAvatar, PeopleIcon, KeyIcon, Icon, SettingsIcon},
}
</script>

<style scoped>
    .background {
        position: fixed;
        backdrop-filter: brightness(0.7);
        top: 0;
        width: 100%;
        height: 100%;
    }
    .sidebarContainer {
        position: fixed;
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
        padding: 20px 0px;
    }
    .sidebarMenu .item {
        display: flex;
        align-items: center;
        padding: 10px 16px;
        /*margin-bottom: 20px;*/
    }
    .sidebarMenu .item:hover,.sidebarMenu .item:focus {
        backdrop-filter: brightness(1.15);
    }
    .item-text {
        margin-left: 15px;
    }

    .slide-leave-active, .slide-enter-active  {
        transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
    }
    .slide-enter-from, .slide-leave-to {
        transform: translateX(-400px);
        opacity: 0;
    }

    @media (min-width: 400px) {
        .sidebarWrapper {
            max-width: 236px;
        }
    }

    @media (min-width: 1000px) {
      .sidebarWrapper {
        max-width: 390px;
      }
    }

</style>
