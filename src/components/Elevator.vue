<template>
    <div class="elevator">
        <div v-for="level in levels" :key="level.name">
            <input type="radio"
                v-model="this.elevator.currentLvl"
                :value="level.value"
            >
        </div>
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
            timer: null
        }
    },
    methods: {
        move(coef) {
            this.timer = setInterval(() => {
                if(this.elevator.targetLvl === this.elevator.currentLvl) {
                    this.elevator.action = 'rest';
                } else {
                    this.elevator.currentLvl += coef;
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
                    let coef = this.elevator.targetLvl > this.elevator.currentLvl ? 1 : -1;
                    this.move(coef);
                    break;
                case 'rest':
                    console.log('rest');
                        clearInterval(this.timer);
                        this.timer = setTimeout(() => {
                            this.elevator.action = 'ready';
                        }, 3000);
                    break;
            }
        }
    },
    mounted() {
        if(localStorage.getItem('elevator.currentLvl')) {
           try {
                this.elevator.currentLvl = JSON.parse(localStorage.getItem('elevator.currentLvl'))
            } catch (e) {
                localStorage.removeItem('elevator.currentLvl');
            }
        }
    },
    watch: {
        'elevator.action'() {
            this.handler();
        },
        'elevator.currentLvl'() {
            console.log('сохраняем значение elevator.currentLvl')
            const parsed = JSON.stringify(this.elevator.currentLvl);
            localStorage.setItem('elevator.currentLvl', parsed);
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
