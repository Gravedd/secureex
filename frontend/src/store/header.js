export default {
    state: {
        showSidebarBtn: true,
        showBackBtn: false,
        backBtnUrl: "",
        headerTitle: "default",
        showActionMenu: true,

    },
    getters: {
        showSidebarBtn: (state) => {
            return state.showSidebarBtn
        },
        showBackBtn: (state) => {
            return state.showBackBtn
        },
        backBtnUrl: (state) => {
            return state.showSidebarBtn
        },
        headerTitle: (state) => {
            return state.headerTitle
        },
        showActionMenu: (state) => {
            return state.showSidebarBtn
        },
    },
    mutations: {
        //settings = {"showSidebarBtn"=true,"showBackBtn"=false,"backBtnUrl"='',"headerTitle"=false,"showActionMenu"=true,}
        setHeaderSetting (state, settings) {
            this.commit("setHeaderName", settings.headerTitle);
            state.showSidebarBtn = settings.showSidebarBtn;
            state.showBackBtn = settings.showBackBtn;
            state.backBtnUrl = settings.backBtnUrl;
            state.showActionMenu = settings.showActionMenu;
        },
        setHeaderName (state, name) {
            state.headerTitle = name;
            document.title = name + " | SecureEx";
        }

    },
    actions: {},
    modules: {},
}