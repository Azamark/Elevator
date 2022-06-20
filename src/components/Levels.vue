<template>
    <div class="levels">
        <div v-for="level in levels" :key="level.name">
            <input type="radio"
                :id="level.name"
                v-model="modelValue"
                :value="level.value"
                @change="selected"
            >
            <label :for="level.name">{{level.name}}</label>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        levels: {
            type: Object,
            required: true,
        },
        modelValue: [Number],
    },
    data() {
        return {

        }
    },
    methods: {
        selected() {
            this.$emit("selected", this.modelValue);
        }
    }
}
</script>