<template>
    <div class="entrance entrance-box container">
        <elevators
            :elevatorCnt="elevatorCnt"
            :levels="levels"
            :calls="callStack[0]"
            @call-completed="setLvlState($event)"
            @call-received="handlerReceivedCall"
        />
        <levels
            :levels="levels"
            @selected="handlerAddCall"
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
            levels: [],
            levelsCnt: 9,
            elevatorCnt: 4
        }
    },
    methods: {
        createLvls() {
            for(let i = 0; i < this.levelsCnt; i++) {
                this.levels.unshift({
                    name: `lvl-${i+1}`,
                    value: i+1,
                    state: 'none'
                })
            }
        },
        setLvlState(data, comand = 'none') {
            let findLvl = this.levels.find(el => el.value === data) 
            if(findLvl) {
                findLvl.state = comand;
            }
        },
        handlerAddCall(call) {
            this.setLvlState(call, 'selected');
            let findCall =  this.callStack.find(el => {
                return el === call
            });
            if(findCall) {
                console.log('Вызов уже в очереди');
            } else {
                this.callStack.push(call);
                console.log(this.callStack)
            }
        },
        handlerReceivedCall(call) {
            this.setLvlState(call, 'progress');
            let index = this.callStack.indexOf(call);
            this.callStack.splice(index, 1);
        }
    },
    created() {
        this.createLvls();
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
    computed: {
        lvlsArr() {
            return this.levels
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


