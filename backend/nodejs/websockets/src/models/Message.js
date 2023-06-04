import Db from "../components/Db.js";
import moment from "moment";

export default class Message {

    static async create(message) {
        let created_at = moment().format('YYYY-MM-DD HH:mm:ss');

        const [message_result] = await Db.execute(
            'INSERT INTO `messages` (`body`, `user_id`, `read`, `conversation_id`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?, ?)',
            [message.text, message.from, 0, message.conversation_id, created_at, created_at]
        );

        return Object.assign({
            "id": message_result.insertId,
            "read": 0,
            "created_at": created_at,
            "updated_at": created_at,
        }, message);
    }

}
