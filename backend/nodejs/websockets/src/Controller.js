import Db from "./Db.js";
import Server from "./Server.js";
import moment from "moment";


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

    async newMessage(socket, data, uuid) {
        let fromId = Server.users[uuid].data.id;
        let toId = data.to_user;

        const [rows, fields] = await Db.execute('SELECT * FROM `conversations` WHERE (`user1_id` = ? AND `user2_id` = ?) OR (`user2_id` = ? AND `user1_id` = ?) LIMIT 1',
            [fromId, toId, fromId, toId]
        );

        let conversation_id = 0;
        if (rows.length === 0) {
            const [result] = await Db.execute(
                'INSERT INTO `conversations` (user1_id, user2_id) VALUES (?, ?)',
                [fromId, toId]
            );
            conversation_id = result.insertId;
        } else {
            conversation_id = rows[0].id;
        }

        let created_at = moment().format('YYYY-MM-DD HH:mm:ss');

        const [message_result] = await Db.execute(
            'INSERT INTO `messages` (`body`, `user_id`, `read`, `conversation_id`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?)',
            [data.text, fromId, 0, conversation_id, created_at, created_at]
        );

        socket.send(JSON.stringify({
            "action": "message_sent",
            "data": {
                "message_id": message_result.insertId,
                "body": data.text,
                "to_user": data.to_user,
                "created_at": created_at,
                "uuid" : data.uuid,
            }
        }));

        for (let uuid in Server.users) {

            if (Server.users[uuid].data.id == data.to_user) {
                Server.users[uuid].ws.send(JSON.stringify({
                    "action": "new_message",
                    "data": {
                        "message_id": message_result.insertId,
                        "body": data.text,
                        "user_id": fromId,
                        "created_at": created_at,
                        "updated_at": created_at,
                        "read": 0,
                        "conversation_id": conversation_id,
                    }
                }));
            }
        }
    }

    async allMessagesRead(socket, data, uuid) {
        let fromId = Server.users[uuid].data.id;
        let toId = data.dialogWith;
        console.log(111);

        const [rows, fields] = await Db.execute('SELECT * FROM `conversations` WHERE (`user1_id` = ? AND `user2_id` = ?) OR (`user2_id` = ? AND `user1_id` = ?) LIMIT 1',
            [fromId, toId, fromId, toId]
        );

        let conversation_id = 0;
        if (rows.length === 0) {
            console.log("Беседа не найдена: ", rows);
            return ;
        }
        conversation_id = rows[0].id;
        const [read_result] = await Db.execute(
            'UPDATE `messages` SET `read` = 1 WHERE `read` = 0 AND `conversation_id` = ? AND `id` <= ? AND `user_id` != ?',
            [conversation_id, data.lastMessageId, fromId]
        );

    }
}
