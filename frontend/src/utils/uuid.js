export default class Uuid {
    static generateUUID() {
        let uuid = '';

        for (let i = 0; i < 3; i++) {
            uuid += Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0');
            uuid += '';
        }

        uuid += Math.floor(Math.random() * 0xffffffffffff).toString(16).padStart(12, '0');

        return uuid;
    }
}