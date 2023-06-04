<template>
    <div class="input-file">
        <label class="custom-file-upload">
            Выбрать файл
            <input :name="name" type="file" class="custom-file-upload" ref="fileInput" @change="handleFileChange"
                   accept="image/*"/>
        </label>
        <div v-if="file" class="file-msg">
            <p>Выбранный файл: {{ file.name }}</p>
        </div>
        <div v-if="!isValid" class="file-msg">
            <p>Выбранный файл неправильного формата. </p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            file   : null,
            isValid: true,
        };
    },
    props  : {
        name
    },
    methods: {
        handleFileChange() {
            const file = this.$refs.fileInput.files[0];
            if (file) {
                if (this.validateFile(file)) {
                    this.file = file;
                    this.isValid = true;
                } else {
                    this.file = null;
                    this.isValid = false;
                }
            }
        },
        validateFile(file) {
            const allowedTypes = ["image/png", "image/gif", "image/jpeg"];
            return allowedTypes.includes(file.type);
        },
        formatSize(size) {
            const units = ["B", "KB", "MB", "GB"];
            let i = 0;
            while (size >= 1024 && i < units.length - 1) {
                size /= 1024;
                i++;
            }
            return `${size.toFixed(2)} ${units[i]}`;
        },
    },
};
</script>
<style scoped>
.input-file {
    display: flex;
    margin-bottom: 8px;
    align-items: center;
}

label.custom-file-upload {
    border: 1px solid var(--main);
    border-radius: 4px;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    background-color: var(--main);
    transition: 0.2s;
    color: var(--text);
    margin-right: 8px;
}


input[type="file"] {
    display: none;
}

label.custom-file-upload:hover, label.custom-file-upload:active {
    background-color: var(--text);
    color: var(--main);
    border: 1px solid var(--text);
}
</style>