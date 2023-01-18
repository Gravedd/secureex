<template>
    <div class="componentWrapper">
        <div class="searchwrapper">
            <div class="searchinputwrap">
                <input type="text" placeholder="Искать пользователя">
            </div>
        </div>
        <div class="dialogList-wrapper" v-for="dialogue in dialogues">
          <dialog-item
              :user_id="dialogue.user_id"
              :username="dialogue.user_name"
              :last-message="dialogue.lastMessage"
              :last-time="dialogue.lastTime"
          />
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
import DialogItem from "@/components/dialogues/Dialog-item";

export default {
	name: 'CleanTemplate',
  computed: {
    dialogues() {
      return this.$store.getters.dialogues;
    },
  },
	components: {DialogItem, ActionMenu}
}

</script>

<style>
.searchwrapper {

}
.searchinputwrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    padding: 8px 16px;
    margin-bottom: 4px;
}
.searchinputwrap input {
    width: 100%;
    height: 40px;
  background-color: var(--bg);
  border: 2px solid var(--bg2);
  border-radius: 10px;
  padding: 0 16px;
}

</style>
