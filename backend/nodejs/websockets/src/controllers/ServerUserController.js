import Server from "../components/Server.js";
import Conversation from "../models/Conversation.js";

export default class ServerUserController {


    userRegistered(socket, message, uuid) {
        console.log(message)
    }

    userUpdated(socket, user, uuid) {
        Server.sendMessageToUserId(user.id, {
            "action": "self_profile_update",
            "data"  : user,
        });
    }

    async sendFile(socket, message, uuid) {
        const to_user_id = await Conversation.getUserIdByConversationId(message.conversation_id, message.user_id);
        if (!to_user_id) {
            return console.log("Не удалось найти беседу");
        }

        Server.sendMessageToUserId(to_user_id,{
            "action": "new_message",
            "data"  : message,
        });
    }
}
