const requests = class requests {

    static apiUrl = 'https://jsonplaceholder.typicode.com/1';
    static baseHeaders = {
        "Content-Type"  : "application/json",
        "Accept"        : "application/json",
    }

    static async sendRequest(url, method, body, headers) {
        let options = this.getOptions(method, body, headers);
        return fetch(url, options);
    }

    static get(url, headers = {}) {
        return this.sendRequest(url, "GET", {}, headers);
    }

    static post(url, body = {}, headers = {}) {
        return this.sendRequest(url, "POST", body, headers);
    }

    static put(url, body = {}, headers = {}) {
        return this.sendRequest(url, "PUT", body, headers);
    }

    static delete(url, body = {}, headers = {}) {
        return this.sendRequest(url, "DELETE", body, headers);
    }



    static getOptions (method, body, headers = {}) {
        method = method.toUpperCase();
        let options = {
            "method": method,
            "headers": Object.assign(this.baseHeaders, headers),
        };

        if (method !== "GET" && method !== "HEAD") {
            options.body = JSON.stringify(body)
        }

        return options;
    }


}

export default {
    install(Vue, args) {
        Vue.config.globalProperties.$request = requests
    }
}