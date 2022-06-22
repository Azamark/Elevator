<template>
    <div>
        <button
            :class="[
                        level.state === 'none' ? 'lvl-none' : '',
                        level.state === 'selected' ? 'lvl-selected' : '',
                        level.state === 'progress' ? 'lvl-progress' : ''
                    ]"
            :id="level.name"
            :value="level.value"
            @click="selected"
        >
            {{level.name}}
        </button>
    </div>
</template>

<script>
export default {
    props: {
        state: [String],
        level: {
            type: Object,
            required: true,
        },
    },
    methods: {
        selected() {
            this.$emit("selected", this.level.value);
        }
    },
}
</script>

<style>

</style>