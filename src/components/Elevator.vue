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
            },
            interval: null
        }
    },
    methods: {
        move(k) {
            this.interval = setInterval(() => {
                if(this.elevator.targetLvl === this.elevator.currentLvl) {
                    this.elevator.action = 'rest';
                } else {
                    this.elevator.currentLvl += k;
                }
            }, 1000)
        },
        handler() {
            switch(this.elevator.action) {
                case 'ready':
                    console.log('ready');
                    this.$emit('call-complete');
                    break;
                case 'move':
                    console.log('move');
                    let k = this.elevator.targetLvl > this.elevator.currentLvl ? 1 : -1;
                    this.move(k);
                    break;
                case 'rest':
                    console.log('rest');
                        clearInterval(this.interval);
                        this.interval = setTimeout(() => {
                            this.elevator.action = 'ready';
                        }, 5000);
                    break;
            }
        }
    },
    watch: {
        'elevator.action'() {
            this.handler();
        },
        call() {
            if(this.elevator.action === 'ready' && !isNaN(this.call)) {
                this.elevator.targetLvl = this.call;
                this.elevator.action = 'move';
            }
        },
    }
}
</script>
