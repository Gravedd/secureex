import Db from "../components/Db.js";
import Server from "../components/Server.js";
import moment from "moment";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";


export default class Controller {

    api = "http://api.shadownet.loc/api";

    async pong(socket, data, uuid) {
        let user = Server.getUser(uuid);
        if (user) {
            Server.users[uuid]["pong_count"]++;
        }
    }

    async newMessage(socket, data, uuid) {
        if (!Server.users[uuid]) {
            return socket.close(1003, "Не найден пользователь!");
        }

        const fromId = Server.users[uuid].data.id;
        const toId = data.to_user;
        const message_uuid = data.uuid;

        const conversation_id = await Conversation.getIdOrCreate(fromId, toId);

        const message = await Message.create({
            "text" : data.text,
            "from" : fromId,
            "conversation_id" : conversation_id
        })

        socket.send(JSON.stringify({
            "action": "message_sent",
            "data": {
                "message_id" : message.id,
                "id"         : message.id,
                "body"       : message.text,
                "to_user"    : toId,
                "created_at" : message.created_at,
                "uuid"       : message_uuid,
                "type"       : "msg",
                "attach_data": null,
            }
        }));

        Server.sendMessageToUserId(data.to_user, {
            "action": "new_message",
            "data"  : {
                "id"             : message.id,
                "body"           : message.text,
                "user_id"        : fromId,
                "created_at"     : message.created_at,
                "updated_at"     : message.created_at,
                "read"           : 0,
                "conversation_id": message.conversation_id,
                "type"           : "msg",
                "attach_data"    : null,
            }
        });
    }

    async allMessagesRead(socket, data, uuid) {
        let fromId = Server.getUser(uuid).data.id;
        let toId = data.dialogWith;

        const conversation_id = await Conversation.findIdByUsers(fromId, toId);
        if (!conversation_id) {
            return ;
        }

        await Db.execute('UPDATE `messages` SET `read` = 1 WHERE `read` = 0 AND `conversation_id` = ? AND `id` <= ? AND `user_id` != ?',
            [conversation_id, data.lastMessageId, fromId]
        );

        Server.sendMessageToUserId(toId, {
            "action": "messages_read",
            "data"  : {
                "from_id"      : fromId,
                "lastMessageId": data.lastMessageId,
            }
        })
    }

    async typing(socket, data, uuid) {
        let fromId = Server.getUser(uuid).data.id;
        if (!fromId) {
            return ;
        }
        let toId = data.to_user;
        const conversation_id = await Conversation.findIdByUsers(fromId, toId);
        if (!conversation_id) {
            return ;
        }

        Server.sendMessageToUserId(toId, {
            "action": "user_typing",
            "data"  : {
                "user_id": fromId,
            }
        });
    }
}
