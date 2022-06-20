<template>
    <elevator
        :levels="levels"
        :call="callStack[0]"
    />
    <levels
       :model-value="picked"
       :levels="levels"
       @selected="pushStack"
    />
</template>

<script>
import Levels from "./components/Levels.vue"
import Elevator from "./components/Elevator.vue"
export default {
    components: {Levels, Elevator},
    data() {
        return { 
            picked: 1,
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
        }
    }
}
</script>


