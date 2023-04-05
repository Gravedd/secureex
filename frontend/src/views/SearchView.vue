<template>

    <div class="appWrapper">

        <app-header :input-instead-of-text="true"></app-header>

        <div class="componentWrapper">
            <user-list></user-list>
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
            let response = await this.$request.get(config.api + "user/find/" + this.searchQuery);
            let result = await response.json();

            if (!response.ok) {
                return this.searchResult = [];
            }

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

</style>
