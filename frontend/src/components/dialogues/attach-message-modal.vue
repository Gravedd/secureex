<template>
    <modal :show="show" header="Отправить вложение" @click="$emit('close_attach')">
        <form method="post" enctype="multipart/form-data" id="sendfile-form" @submit="sendFile">

            <input-file name="file" :check-type-validity="false"></input-file>

            <div class="center-input margin-top-16">
                <input type="submit" class="submit-btn" value="Подтвердить">
            </div>
            <input type="hidden" name="to_user" :value="to_user">
        </form>
    </modal>
</template>
<script>
import Modal from "@/components/modal";
import InputFile from "@/components/ui/input-file";
import config from "@/config";
import Uuid from "@/utils/uuid";

export default {
    name: "attach-message-modal",
    components: {Modal, InputFile},
    props : ["show", "to_user"],
    emits: ["close_attach"],
    methods: {
        async sendFile(event) {
            event.preventDefault();

            let uuid = Uuid.generateUUID();
            this.$emit("close_attach");

            this.$showLoader();

            let form = new FormData(document.getElementById("sendfile-form"));

            form.append("uuid", uuid);

            const response = await fetch(config.api + "conversations/sendfile", {
                method : "POST",
                body   : form,
                headers: {"Authorization": "Bearer " + this.$store.getters.user_token, "Accept": "application/json"},
            });

            this.$hideLoader();

            let uploadResult = await response.json();

            if (response.status !== 201) {
                return await this.$swal.fire({
                    "title": "Ошибка!",
                    "text" : uploadResult.message,
                })
            }
        }
    }

}
</script>
<style scoped>
</style>