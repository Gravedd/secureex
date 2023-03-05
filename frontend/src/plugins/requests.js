const requests = class requests {

}

export default {
    install(Vue, args) {
        Vue.config.globalProperties.$request = requests
    }
}