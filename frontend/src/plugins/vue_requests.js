import requests from "@/plugins/requests";

export default {
    install(Vue, args) {
        Vue.config.globalProperties.$request = requests
    }
}