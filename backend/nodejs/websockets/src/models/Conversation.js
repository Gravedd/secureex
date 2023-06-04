import Db from "../Db.js";

export default class Conversation {

    static async find(id) {
        const [rows] = await Db.execute('SELECT * FROM `conversations` WHERE `id` = ? LIMIT 1',[id]);

        return rows[0] ?? false;
    }

    static async create(user1_id, user2_id) {
        const [result] = await Db.execute('INSERT INTO `conversations` (user1_id, user2_id) VALUES (?, ?)',[user1_id, user2_id]);

        return result.insertId;
    }

    static async findIdByUsers(user1_id, user2_id) {
        const [rows] = await Db.execute(
     'SELECT * FROM `conversations` WHERE (`user1_id` = ? AND `user2_id` = ?) OR (`user2_id` = ? AND `user1_id` = ?) LIMIT 1',
    [user1_id, user2_id, user1_id, user2_id]
        );

        return rows[0]?.id ?? false;
    }

    static async getIdOrCreate(user1_id, user2_id) {
        let conversation_id = await this.findIdByUsers(user1_id, user2_id);
        if (conversation_id !== false) {
            return conversation_id;
        }

        return await this.create(user1_id, user2_id);
    }
}
