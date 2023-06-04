import Server from "./src/components/Server.js";
import Log from "./src/components/Log.js";

Log.info("Сервер запускается");

let server = new Server();

server.start();
