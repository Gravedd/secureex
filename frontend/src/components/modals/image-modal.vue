<template>
    <modal :show="show" :stop-propagation="false" :padding="false" :transparent-bg="true" @click="close">
        <div class="image-modal-container">
            <img :src="image.src" :alt="image.alt">
        </div>
    </modal>
</template>
<script>
import Modal from "@/components/modals/modal";
export default {
    name: "image-modal",
    components: {Modal},
    computed: {
        show() {
            return this.$store.getters.showImageModal;
        },
        image() {
            return this.$store.getters.modalImageData;
        },
    },
    methods: {
        close() {
            this.$store.commit("hideImageModal");
        }
    }
}
</script>
<style scoped>
    .image-modal-container {
        width: 100%;
        height: 100vh;
        display: flex;
    }
    .image-modal-container img {
        width: 100%;
        object-fit: contain;
        padding-bottom: 16px;
    }
</style>