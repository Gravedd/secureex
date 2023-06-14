import Server from "../components/Server.js";

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
}
