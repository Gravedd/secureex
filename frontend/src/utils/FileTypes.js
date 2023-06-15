export default class FileTypes {
    static images = [
        "image/x-ms-bmp",
        "image/gif",
        "image/jpeg",
        "image/png",
        "image/tiff",
        "image/webp"
    ]
    //TODO: video

    static getType(mimetype) {
        if (this.images.includes(mimetype)) {
            return "img";
        }

        return "file";
    }


}