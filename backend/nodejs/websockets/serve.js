import Server from "./src/server.js";
import Log from "./src/Log.js";

Log.info("Сервер запускается");

let server = new Server();

server.start();
