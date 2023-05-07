import Db from "./Db.js";
import Server from "./Server.js";


export default class Controller {

    api = "http://api.secureex.loc/api";

    async auth(socket, data, uuid) {
        let token = data.token ?? null;
        if (!token) {
            return console.log("Нет токена");
        }

        let response = await fetch(this.api + "/user", {
            headers: {
                "Authorization": 'Bearer ' + token,
                "Accept": "application/json",
            }
        });


        if (response.status !== 200) {
            return console.log("Ошибка авторизации", await response.json())
        }

        let user = await response.json();

        Server.onUserSuccessAuthorized(user, socket, uuid);
    }

    async pong(socket, data, uuid) {
        Server.users[uuid]["pong_count"]++;
    }
}
