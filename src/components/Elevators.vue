<template>
    <div v-for="elevator in elevators" :key="elevator.id">
        <elevator
            :levels="levelsCnt"
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
            type: Array,
            required: true,
        },
        levelsCnt: {
            type: Number,
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
            if (this.callCnt > 0) {
                this.callCnt -= 1;
            }
            this.$emit('call-completed', data);
        },
        handlerCalls() {
            let filter = this.elevators.filter(el => el.action === 'ready');
            if(filter.length && this.calls.length) {
                for(let i = 0; i < filter.length; i++) {
                    if(this.calls[i + this.callCnt]) {
                        let find = filter.find(el => el.currentLvl === this.calls[i + this.callCnt])
                        if(find) {
                            this.callCnt += 1;
                            find.action = 'rest';
                        } else {
                            filter[i].targetLvl = this.calls[i + this.callCnt];
                            this.callCnt += 1;
                            filter[i].action = 'move'
                        }
                    }
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
