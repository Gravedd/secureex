<template>
    <svg :width="width" :height="height" viewBox="0 0 19 19" :fill="color" xmlns="http://www.w3.org/2000/svg">
        <slot color="{{color}}"/>
    </svg>
</template>
<script>
export default {
	name: "icon",
    props: {
		width: {
			default: 19,
        },
		height: {
			default: 19,
		},
		color: {
			default: "#ffffff",
		},

    }
}
</script>
<style scoped>
    svg {
        display: inline-block;
        cursor: pointer;
    }
</style>