import store from "@/store";

export default {
    /*created() {
        console.log('вызван хук из примеси')
    }*/
    methods: {
        openMenu () {
            this.$store.commit("actionMenuStatus", true);
        },
        updateInput(e) {
            this.$store.commit("headerInputValue", e.target.value);
        }
    },
    computed: {
        showSidebarBtn() {
            return this.$store.getters.showSidebarBtn;
        },
        showBackBtn() {
            return this.$store.getters.showBackBtn;
        },
        backBtnUrl() {
            return this.$store.getters.backBtnUrl;
        },
        headerTitle() {
            return store.getters.headerTitle;
        },
        showActionMenu() {
            return this.$store.getters.showActionMenu;
        },
        showHeader() {
            return this.$store.getters.showHeader;
        },
        inputInsteadOfText() {
            return this.$store.getters.inputInsteadOfText;
        },
        showSearchIcon() {
            return this.$store.getters.showSearchIcon;
        }
    },

}