<template>
    <p> Вызов {{picked}}</p>
    <div class="levels"
        v-for="level in levels"
        :key="level.name"
    >
        <input type="radio"
            v-model="elevator.currentLvl" 
            :value="level.value"
        >
        <input type="radio"
            v-model="picked" 
            :id="level.name"
            :value="level.value"
            @change="select"
        >
        <label :for="level.name">{{level.name}}</label>
    </div>
    <p> Текущий {{elevator.currentLvl}}</p>

</template>

<script>
export default {
    data() {
        return { 
            levels: [
                {name: 'One',value: 1},
                {name: 'Two',value: 2},
                {name: 'Three',value: 3},
                {name: 'Four',value: 4},
                {name: 'Five',value: 5}
            ],
            picked: 1,
            callStack: [],
            elevator: {
                action: 'ready',
                currentLvl: 1,
                targetLvl: 1
            }
        }
    },
    methods: {
        select() {
            console.log(this.picked);
            let find = this.callStack.find( el => {
                return el === this.picked
            });
            if(find) {
                console.log('Вызов уже в очереди');
            } else {
                this.callStack.push(this.picked);
                console.log(`Вызов на ${this.picked} этаж`);
                console.log(`Очередь вызовов ${this.callStack}`);
                if(this.elevator.action === 'ready') {
                    this.elevator.targetLvl = this.callStack[0];
                }
            }
        }
    },
    watch: {
        elevator: {
            handler(val, oldVal) {
                if(this.elevator.targetLvl !== this.elevator.currentLvl) {
                    this.elevator.currentLvl = this.elevator.targetLvl
                    this.callStack.shift();
                }
            },
            deep: true
        }
    }
}
</script>


