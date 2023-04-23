<template>

    <div class="appWrapper">

        <app-header>Настройки</app-header>

        <div class="componentWrapper">

            <div class="settingsContainer">
                <div class="profileInfoWrapper flex col-1-1" @click="openModal">
                <!--TODO: сделать фон блюром аватарки-->
                    <div class="profileInfoAvatar">
                        <user-avatar class="avatar" :username="username" :avatar-src="$store.getters.user_avatar"  />
                    </div>
                    <div class="profileInfo">
                        <div class="username">{{ username }}</div>
                        <div class="nickname">@{{ userNickname }}</div>
                    </div>
                </div>

                <div class="settingsWrapper">
                    <div class="settingHeader">Основная информация</div>
                    <div class="inputSetting">
                        <input type="text" placeholder="Имя..." v-model="newUserName">
                        <label>Ваше имя</label>
                    </div>
                    <div class="inputSetting">
                        <input type="text" placeholder="Никнейм..."  v-model="newUserNickname">
                        <label>Никнейм профиля</label>
                    </div>
                </div>
                <div class="savebtnwrap">
                    <div class="savebutton" @click="saveSettings">Сохранить</div>
                </div>
            </div>

            <modal header="Загрузить аватар" @closeModal="closeModal" :show="showAvatarModal">
                <p>Загрузить файл</p>
                <form method="post" enctype="multipart/form-data" id="avatar-form" @submit="updateAvatar">

                    <input-file name="file">Выберете аватар</input-file>

                    <div class="center-input margin-top-16">
                        <input type="submit" class="submit-btn" value="Подтвердить">
                    </div>
                </form>
            </modal>

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
import Modal from "@/components/modal";
import InputFile from "@/components/ui/input-file";
import config from "@/config";
import UserAvatar from "@/components/users/user-avatar";
import store from "@/store";

export default {
	name: 'SettingsView',
	components: {UserAvatar, InputFile, Modal, AppSidebar, ActionMenu, AppHeader},
    data() {
	    return {
	        showAvatarModal: false,
            newUserName: "",
            newUserNickname: "",
        }
    },
    computed: {
        username() {
            this.newUserName = this.$store.getters.user_name;
            return this.$store.getters.user_name;
        },
        userNickname() {
            this.newUserNickname = this.$store.getters.user_nickname;
            return this.$store.getters.user_nickname;
        },
    },
    methods: {
        closeModal() {
            this.showAvatarModal = false;
        },
        openModal() {
            this.showAvatarModal = true;
        },
        async updateAvatar(event) {
            event.preventDefault();
            this.$showLoader();

            let form = new FormData(document.getElementById("avatar-form"));
            const response = await fetch(config.api + "user/himself/avatar", {
                method: "POST",
                body: form,
                headers: {"Authorization": "Bearer " + this.$store.getters.user_token, "Accept": "application/json"},
            });

            this.$hideLoader();

            let uploadResult = await response.json();

            if (response.status !== 201) {
                return await this.$swal.fire({
                    "title": "Ошибка!",
                    "text": uploadResult.message,
                })
            }
            await this.setNewAvatar(uploadResult);
        },
        setNewAvatar(data) {
            this.$store.commit("setUserAvatar", data.path);
            this.$swal.fire('Успешно', 'Аватар изменен!', 'success');
            this.closeModal();
        },

        async saveSettings() {
            const response = await this.$request.put(config.api + "user/himself", {
                name: this.newUserName,
                nickname: this.newUserNickname,
            })

            let result = await response.json();
            if (!response.ok) {
                this.$swal.fire({
                    "title": "Ошибка!",
                    "text": result.message,
                })
            }
            this.$store.commit("successAuth", result.user);
            this.$swal.fire("Успешно!", "Настройки сохранены", "success");
        },
    },
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
.profileInfoAvatar .avatar {
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
.inputSetting label {
    font-size: 12px;
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
