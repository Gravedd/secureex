<template>
    <div
        class="user-avatar"
        :style="avatarStyle"
    >{{ usernameFirstLetter }}</div>
</template>
<script>
import config from "@/config";

export default {
    name: "user-avatar",
    data() {
        return {

        }
    },
    props: {
        avatarSrc: {
            default: null,
            type: String,
        },
        username: {
            default: "",
            type: String,
        }
    },
    methods: {
        getColorFromString(str) {
            const colors = ["#a84242", "#d49030", "#a88f11", "#2c6bd7", "#0c8270", "#b60c0c", "#7a0cb6", "#8b0b51"];
            function hashCode(str) {
                let hash = 0;
                if (!str) {
                    return "";
                }
                for (let i = 0; i < str.length; i++) {
                    hash = ((hash << 5) - hash) + str.charCodeAt(i);
                    hash |= 0;
                }
                return hash;
            }
            const index = Math.floor(Math.abs(hashCode(str)) % colors.length);
            return colors[index];
        }
    },
    computed: {
        avatarStyle () {
            if (this.avatarSrc != null) {
                return {
                    'background-image': 'url(' + config.img + this.avatarSrc +')',
                    'font-size': "0px"
                }
            }

            return {
                'background-color': this.getColorFromString(this.username)
            }
        },
        usernameFirstLetter() {
            return this.username ? this.username[0] : "";
        }
    }
}
</script>
<style scoped>
.user-avatar {
    min-height: 39px;
    min-width: 39px;
    background-color: var(--gray4);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    background-size: cover;
}
</style>