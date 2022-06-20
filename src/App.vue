<template>
    <div class="entrance entrance-box container">
        <elevator
            :levels="levels"
            :call="callStack[0]"
            @call-complete="shiftStack"
        />
        <levels
            :levels="levels"
            @selected="pushStack"
        />
    </div>
</template>

<script>
import Levels from "./components/Levels.vue"
import Elevator from "./components/Elevator.vue"
export default {
    components: {Levels, Elevator},
    data() {
        return { 
            callStack: [],
            levels: [
                {name: 'One', value: 1},
                {name: 'Two', value: 2},
                {name: 'Three', value: 3},
                {name: 'Four', value: 4},
                {name: 'Five', value: 5}
            ],
        }
    },
    methods: {
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


