export default {
    methods: {
        openMenu () {
            this.$store.commit("actionMenuStatus", true);
        },
        updateInput(e) {
            this.$store.commit("headerInputValue", e.target.value);
        }
    },
    props: {
        showHeader: {
            default: true,
            type: Boolean,
        },
        backBtnUrl: {
            default: "/",
            type: String,
        },
        showSidebarBtn: {
            default: false,
            type: Boolean,
        },
        showBackBtn: {
            default: true,
            type: Boolean,
        },
        showActionMenu: {
            default: true,
            type: Boolean,
        },
        inputInsteadOfText: {
            default: false,
            type: Boolean,
        },
        showSearchIcon: {
            default: false,
            type: Boolean,
        },

    },
}