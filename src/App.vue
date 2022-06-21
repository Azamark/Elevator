<template>
    <div class="entrance entrance-box container">
        <elevators
            :elevatorCnt="elevatorCnt"
            :levels="levels"
            :call="callStack[0]"
            @call-received="shiftStack"
        />
        <levels
            :levelsCnt="levelsCnt"
            @selected="pushStack"
            @levels-ready="getLvlsArray"
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
            levelsCnt: 7,
            levels: [],
            elevatorCnt: 3
        }
    },
    methods: {
        getLvlsArray($data) {
            this.levels = $data;
        },
        pushStack($data) {
            let find =  this.callStack.find(el => {
                return el === $data
            });
            if(find) {
                console.log('Вызов уже в очереди');
            } else {
                this.callStack.push($data);
                console.log(this.callStack);
            }
        },
        shiftStack() {
            console.log('Удаление первого элемента массива')
            this.callStack.shift();
            console.log(this.callStack)
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
                console.log('сохраняем значение callStack')
                const parsed = JSON.stringify(newVal);
                localStorage.setItem('callStack', parsed);
            },
            deep: true
        }
    }
}
</script>


