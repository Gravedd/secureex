import Db from "../Db.js";

export default class User {

    static async find(id) {
        const [rows, fields] = await Db.execute('SELECT * FROM `users` WHERE `id` = ? LIMIT 1',
            [id]
        );
        return rows[0] ?? false;
    }

    static async create(user) {

    }

    static async update() {

    }

    static async delete() {

    }
}
