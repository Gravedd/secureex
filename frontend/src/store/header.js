export default {
    state: {
        showSidebarBtn: true,
        showBackBtn: false,
        backBtnUrl: "",
        headerTitle: "secureex",
        showActionMenu: true,
        showHeader: true,
        inputInsteadOfText: false,
        headerInputValue: "",
    },
    getters: {
        showSidebarBtn: (state) => {
            return state.showSidebarBtn
        },
        showBackBtn: (state) => {
            return state.showBackBtn
        },
        backBtnUrl: (state) => {
            return state.backBtnUrl
        },
        headerTitle: (state) => {
            return state.headerTitle
        },
        showActionMenu: (state) => {
            return state.showActionMenu
        },
        showHeader: (state) => {
            return state.showHeader
        },
        inputInsteadOfText: (state) => {
            return state.inputInsteadOfText
        },
        headerInputValue: (state) => {
            return state.headerInputValue
        },
    },
    mutations: {
        //settings = {"showSidebarBtn"=true,"showBackBtn"=false,"backBtnUrl"='',"headerTitle"=false,"showActionMenu"=true,}
        setHeaderSetting (state, settings) {
            this.commit("reset", true);
            this.commit("setHeaderName", settings.headerTitle);
            state.showSidebarBtn = settings.showSidebarBtn;
            state.showBackBtn = settings.showBackBtn;
            state.backBtnUrl = settings.backBtnUrl;
            state.showActionMenu = settings.showActionMenu;
        },
        setHeaderName (state, name) {
            state.headerTitle = name;
            document.title = name + " | SecureEx";
        },
        reset (state, settings) {
            state.showSidebarBtn = true
            state.showBackBtn = false
            state.backBtnUrl = ""
            state.headerTitle = "secureex"
            state.showActionMenu = true
        },
        showHeader(state, value) {
            state.showHeader = value;
        },
        inputInsteadOfText(state, value) {
            state.inputInsteadOfText = value;
        },
        headerInputValue(state, value) {
            state.headerInputValue = value;
        },

    },
    actions: {},
    modules: {},
}