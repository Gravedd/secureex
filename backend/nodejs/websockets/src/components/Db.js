import mysql from "mysql2/promise";
import dotenv from "dotenv";

export default new class Db {

    constructor() {
        global.env_vars = dotenv.config({path: '../../.env'}).parsed;

        this.pool = mysql.createPool({
            host              : global.env_vars.DB_HOST,
            user              : global.env_vars.DB_USERNAME,
            database          : global.env_vars.DB_DATABASE,
            password          : global.env_vars.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit   : 10,
            queueLimit        : 0
        });
    }

    //const [rows] = await Db.execute("SELECT * FROM `users`");
    execute(query, params = []) {
        return this.pool.execute(query, params);
    }

}
