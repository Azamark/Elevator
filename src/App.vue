<template>
    <div class="entrance entrance-box container">
        <elevators
            :elevatorCnt="elevatorCnt"
            :levelsCnt="levelsCnt"
            :calls="callStack"
            @call-completed="delStackEl"
        />
        <levels
            :levelsCnt="levelsCnt"
            @selected="pushStack"
        />
    </div>
</template>

<script>
import Levels from "./components/Levels.vue"
import Elevators from "./components/Elevators.vue"
export default {
    components: {Levels, Elevators},
    data() {
        return { 
            callStack: [],
            levelsCnt: 9,
            elevatorCnt: 1
        }
    },
    methods: {
        pushStack(data) {
            let find =  this.callStack.find(el => {
                return el === data
            });
            if(find) {
                console.log('Вызов уже в очереди');
            } else {
                this.callStack.push(data);
            }
        },
        delStackEl(data) {
            let index = this.callStack.indexOf(data);
            this.callStack.splice(index, 1);
        }
    },
    mounted() {
        if(localStorage.getItem('callStack')) {
            try {
                this.callStack = JSON.parse(localStorage.getItem('callStack'))
            } catch (e) {
                localStorage.removeItem('callStack');
            }
        }
    },
    watch: {
        callStack: {
            handler(newVal) {
                const parsed = JSON.stringify(newVal);
                localStorage.setItem('callStack', parsed);
            },
            deep: true
        }
    }
}
</script>


