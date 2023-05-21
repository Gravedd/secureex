import fs from "fs";

export default class Log {
    static log(message, context = {}) {
        let content = `[${new Date().toISOString()}] ` + message + " : " + JSON.stringify(context) + "\n";

        fs.appendFileSync('log', content);
    }

    static info(message, context = {}) {
        Log.log(`[INFO] ${message}`, context);
    }

    static error(message, context = {}) {
        Log.log(`[ERROR] ${message}`, context);
    }
}
