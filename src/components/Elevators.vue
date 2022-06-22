<template>
    <div v-for="elevator in elevators" :key="elevator.id">
        <elevator
            :levels="levels"
            :elevator="elevator"
            @elevator-ready="isElevatorReady"
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
        calls: {
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
            callCnt: 0,
            elevators: [],
        }
    },
    methods: {
        isElevatorReady(data) {
            this.$emit('call-completed', data);
            this.handlerCalls();
        },
        isCallReceived(data) {
            this.$emit('call-received', data);
        },
        handlerCalls() {
            let filter = this.elevators.filter(el => el.action === 'ready')
            if(filter.length && !isNaN(this.calls)) {
                let find = filter.find(el => el.currentLvl === this.calls)
                if(find) {
                    this.isCallReceived(this.calls);
                    find.action = 'rest';
                } else {
                    let sort = filter.sort((a, b) => {
                        return Math.abs(this.calls - a.currentLvl) - Math.abs(this.calls - b.currentLvl)
                    });
                    sort[0].targetLvl = this.calls;
                    this.isCallReceived(this.calls)
                    sort[0].action = 'move'
                }
            }
        }
    },
    created() {
        for(let i = 0; i < this.elevatorCnt; i++){
            this.elevators.push({
                action: 'ready',
                currentLvl: 1,
                targetLvl: 1,
                id: i
            })
        }
    },
    watch: {
        calls: {
            handler(){
                this.handlerCalls();
            },
            deep: true
        },
    }
}
</script>
