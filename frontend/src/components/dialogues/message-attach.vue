<template>
    <div class="attach-wrapper">
        <div class="attach-file" @click="download">
            <div class="file-icon"><icon height="35" width="35" color="#fff"><file-icon/></icon></div>
            <div class="file-info">
                <div class="file-name">{{ attach_data.filename }}</div>
                <div class="file-size">{{ filesize }}</div>
            </div>
        </div>
    </div>
</template>
<script>
import Icon from "@/components/icons/icon";
import FileIcon from "@/components/icons/FileIcon";
import config from "@/config";
export default {
    name: "message-attach",
    components: {FileIcon, Icon},
    props: {
        message_type: {
            default: "msg",
            type: String,
            required: true
        },
        attach_data: {
            default: "msg",
            type: Object,
        },
    },
    methods: {
        download() {
            window.open(config.files + this.attach_data.path);
        }
    },
    computed: {
        filesize() {
            let filesize = this.attach_data.size ?? 0;
            filesize = filesize === 0 ? 0 : filesize / 1024 / 1024;
            return filesize.toFixed(1) + " MB";
        }
    }
}
</script>
<style scoped>
    .attach-file {
        width: 100%;
        height: 40px;
        display: flex;
        cursor: pointer;
    }
    .attach-file .file-icon {
        width: 40px;
        height: 40px;
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .file-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>