import store from "@/store";
export default {
    install(Vue, args) {
        //Включить анимацию загрузки
        Vue.config.globalProperties.$showLoader = function () {
            store.commit("showLoader");
        };
        //Выключить анимацию загрузки
        Vue.config.globalProperties.$hideLoader = function () {
            store.commit("hideLoader");
        };
    }
}
