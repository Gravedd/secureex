<template>
    <div class="modal-container" @click="$emit('closeModal')" v-show="show">
        <div class="modal-full-wrapper">
            <div class="modal-wrapper" @click="clickOnModal">
                <div class="modal-header">
                    {{ header }}
                </div>
                <div class="modal-content">
                    <slot/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "modal",
    props: {
        header: {
            default: "",
            type: String,
        },
        show: {
            default: false,
            type: Boolean
        }
    },
    methods: {
        clickOnModal(event) {
            event.stopPropagation();
        }
    },
    emits: ["closeModal"]
}
</script>
<style scoped>
.modal-container {
    position: fixed;
    backdrop-filter: brightness(0.6);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.modal-full-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
}
.modal-wrapper {
    background-color: var(--bg3);
    padding: 16px;
    width: 100%;
}
.modal-header {
    margin-bottom: 16px;
    font-size: 18px;
}
@media (min-width: 1000px) {
    .modal-full-wrapper {
        padding: 0 116px;
    }
}
@media (min-width: 1500px) {
    .modal-full-wrapper {
        padding: 0 416px;
    }
}
</style>