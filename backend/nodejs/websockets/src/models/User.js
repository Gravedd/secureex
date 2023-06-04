import Db from "../components/Db.js";

export default class User {

    static async find(id) {
        const [rows] = await Db.execute('SELECT * FROM `users` WHERE `id` = ? LIMIT 1',[id]);

        return rows[0] ?? false;
    }

}
