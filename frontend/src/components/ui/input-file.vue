<template>
    <div class="form-input">
        <label for="file-upload" class="custom-file-upload">
            <slot></slot>
        </label>
        <input id="file-upload" type="file" name="file" required>
    </div>
</template>
<script>
export default {
    name: "input-file",
}
</script>
<style scoped>
label.custom-file-upload {
    border: 1px solid #ddd;
    border-radius: 4px;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    background-color: #f7f7f7;
    color: #444;
}

input[type="file"] {
    /*display: none;*/
}

label.custom-file-upload:hover {
    background-color: #e6e6e6;
}

label.custom-file-upload:active {
    background-color: #d4d4d4;
}

</style>