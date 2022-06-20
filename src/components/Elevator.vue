<template>
    <div v-for="level in levels" :key="level.name">
        <input type="radio"
            v-model="this.elevator.currentLvl"
            :value="level.value"
        >
    </div>
</template>

<script>
export default {
    props: {
        call: {
            type: Number,
            required: true,
        },
        levels: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            elevator: {
                action: 'ready',
                currentLvl: 1,
                targetLvl: null
            }
        }
    },
    methods: {
        move() {

        },
        handler() {
            switch(this.elevator.action) {
                case 'move':
                    console.log('move');
                    break;
                case 'rest':
                    console.log('rest');
                    break;
            }
        }
    },
    watch: {
        'elevator.action'() {
            this.handler();
        },
        call() {
            this.elevator.targetLvl = this.call;
            this.elevator.action = 'move';
        },
    }
}
</script>
