import dotenv from "dotenv";
global.env_vars = dotenv.config({path: '../../.env'}).parsed;

import Server from "./src/components/Server.js";
import Log from "./src/components/Log.js";



Log.info("Сервер запускается");
try {
    let server = new Server();
    server.start();
} catch (Err) {
    Log.error(Err.message, Err);
}
