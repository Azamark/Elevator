<template>
    <div class="cabin" :class="[state === 'move' ? 'elevator-move' : '', state === 'rest' ? 'elevator-rest' : '']">
        <div class="cabin-direction">
            <div v-if="direction === 1" class="arrow-up">
                >
            </div>
            <div v-else-if="direction === -1" class="arrow-down">
                >
            </div>
        </div>
        <div class="target">
            <p>{{target}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        target: [Number],
        direction: [Number],
        state: [String]
    },
    data() {
        return {

        }
    },
}
</script>
