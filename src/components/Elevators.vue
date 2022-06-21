<template>
    <div v-for="elevator in elevators" :key="elevator.id">
        <elevator
            :call="call"
            :levels="levels"
            :elevator="elevator"
            @elevator-ready="handlerCall"
        />
    </div>
</template>

<script>
import Elevator from "./Elevator.vue"
export default {
    components: {Elevator},
    props: {
        elevatorCnt: {
            type: Number,
            required: true,
        },
        call: {
            type: Number,
            required: true,
        },
        levels: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            elevators: [],
        }
    },
    methods: {
        handlerCall() {
            let find = this.elevators.find(el => el.action === 'ready');
            if(find && !isNaN(this.call)) {
                find.targetLvl = this.call;
                this.$emit('call-received');
                find.action = 'move';
            }
        }
    },
    created() {
        for(let i = 0; i < this.elevatorCnt; i++){
            this.elevators.push({
                action: 'ready',
                currentLvl: 1,
                targetLvl: null,
                id: i
            })
        }
    },
    watch: {
        call() {
            this.handlerCall();
        },
    }
}
</script>
