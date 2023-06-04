import mysql from "mysql2/promise";


export default new class Db {

    constructor() {
        //todo: брать из .env
        this.pool = mysql.createPool({
            host              : 'localhost',
            user              : 'root',
            database          : 'secureex',
            password          : '',
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
