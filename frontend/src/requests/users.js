import config from "@/config";
import requests from "@/plugins/requests";

export default class Users {

    static async getUser(id) {
        const response = await requests.get(config.api + "user/" + id);

        if (!response.ok) {
            return false;
        }

        return await response.json();
    }

}