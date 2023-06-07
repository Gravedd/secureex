import Server from "./src/components/Server.js";
import Log from "./src/components/Log.js";

Log.info("Сервер запускается");
try {
    let server = new Server();
    server.start();
} catch (Err) {
    Log.error(Err.message, Err);
}
