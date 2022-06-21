<template>
    <div class="elevator">
        <div v-for="level in levels" :key="level.name">
            <div class="level level-box" :data-value="this.elevator.currentLvl">
                <cabin v-show="level.value === this.elevator.currentLvl"
                    :target="this.elevator.targetLvl"
                    :state="this.elevator.action"
                    :direction="coef"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Cabin from './Cabin.vue';
export default {
    components: {Cabin},
    props: {
        call: {
            type: Number,
            required: true,
        },
        levels: {
            type: Array,
            required: true,
        },
        elevator: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            timer: null,
            coef: null
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
                    this.$emit('elevator-ready');
                    break;
                case 'move':
                    console.log('move');
                    this.coef = this.elevator.targetLvl > this.elevator.currentLvl ? 1 : -1;
                    this.move(this.coef);
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
        if(localStorage.getItem(`elevator.currentLvl-id${this.elevator.id}`)) {
           try {
                this.elevator.currentLvl = JSON.parse(localStorage.getItem(`elevator.currentLvl-id${this.elevator.id}`))
            } catch (e) {
                localStorage.removeItem(`elevator.currentLvl-id${this.elevator.id}`);
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
            localStorage.setItem(`elevator.currentLvl-id${this.elevator.id}`, parsed);
        },
    }
}
</script>
