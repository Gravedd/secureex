<template>
    <div class="appWrapper">
        <app-header :input-instead-of-text="true" :show-action-menu="false"/>

        <div class="componentWrapper">
            <user-list :users="searchResult"></user-list>

            <div class="users-empty-message" v-if="searchResult.length === 0 & searchQuery !== ''">
                <p>Не найдены пользователи по запросу «{{ searchQuery }}»</p>
            </div>
        </div>
    </div>
</template>

<script>

import ActionMenu from "@/components/action-menu";
import DialogItem from "@/components/dialogues/Dialog-item";
import AppHeader from "@/components/headers/app-header";
import config from "@/config";
import UserList from "@/components/users/user-list";

export default {
    name: 'CleanTemplate',
    data() {
        return {
            searchResult: [],
        }
    },
    computed: {
        dialogues() {
            return this.$store.getters.dialogues;
        },
        searchQuery() {
            return this.$store.getters.headerInput;
        },
    },
    components: {UserList, AppHeader, DialogItem, ActionMenu},
    methods: {
        async searchUser() {
            let response = await this.$request.get(config.api + "users/find?query=" + this.searchQuery);

            if (!response.ok) {
                return this.searchResult = [];
            }

            let result = await response.json();
            this.searchResult = result;

            return result;
        }
    },
    watch: {
        searchQuery(now, old) {
            this.searchUser();
        }
    }
}
</script>
<style>
    .users-empty-message {
        padding: 16px 0;
    }
</style>
